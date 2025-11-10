const User = require("../models/user");
const Videogame = require("../models/videogame");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../utils/token");
const deleteFile = require("../../utils/deleteFile");

const register = async (req, res, next) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      if (req.file) deleteFile(req.file.path);
      return res
        .status(400)
        .json({ error: "Ya existe un usuario registrado con este email" });
    }
    const { name, email, password } = req.body;
    const user = new User({ name, email, password, role: "user" });
    if (req.file) user.avatar = req.file.path;
    const userDB = await user.save();
    const userResponse = userDB.toObject();
    delete userResponse.password; // Limpieza de seguridad
    return res
      .status(201)
      .json({ message: "Usuario registrado con éxito", user: userResponse });
  } catch (error) {
    if (req.file) deleteFile(req.file.path);
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: "Datos de usuario inválidos" });
    }
    res.status(500).json({ error: "Error registrando al usuario" });
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Usuario o contraseña incorrectos" });
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateToken(user._id, user.email);
      const userResponse = user.toObject();
      delete userResponse.password;
      return res.status(200).json({ token, user: userResponse });
    } else {
      return res
        .status(400)
        .json({ error: "Usuario o contraseña incorrectos" });
    }
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Datos de usuario inválidos" });
    }
    return res.status(500).json({ error: "Error en el login" });
  }
};

const editUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      if (req.file) deleteFile(req.file.path);
      return res
        .status(404)
        .json({ error: `No se ha encontrado ningún usuario con el id ${id}` });
    }
    // si manda un nuevo avatar:
    if (req.file) req.body.avatar = req.file.path; // actualizo url

    const editedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (req.file && user.avatar) deleteFile(user.avatar); // borro el avatar antiguo de cloudinary
    const userResponse = editedUser.toObject();
    delete userResponse.password;
    return res.status(200).json({
      message: "Usuario editado con éxito",
      user: userResponse,
    });
  } catch (error) {
    if (req.file) deleteFile(req.file.path);
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({ error: "Datos de usuario inválidos" });
    }
    return res.status(500).json({ error: "Error al editar el usuario" });
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res
        .status(404)
        .json({ error: `No se ha encontrado ningún usuario con el id ${id}` });
    }
    if (deletedUser.avatar) deleteFile(deletedUser.avatar);
    const userResponse = deletedUser.toObject();
    delete userResponse.password;
    return res
      .status(200)
      .json({ message: "Usuario eliminado con éxito", user: userResponse });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "ID de usuario inválido" });
    }
    return res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};

const changeRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    if (!role) {
      return res.status(400).json({ error: "El campo 'role' es obligatorio" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const userResponse = updatedUser.toObject();
    delete userResponse.password;
    return res.status(200).json({
      message: `Rol de usuario ${updatedUser.email} actualizado a ${updatedUser.role}.`,
      user: userResponse,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "ID de usuario inválido" });
    }
    return res
      .status(500)
      .json({ error: "Error al cambiar el rol del usuario." });
  }
};

const toggleFavorite = async (req, res, next) => {
  try {
    const { videogameId } = req.params;
    const userId = req.user._id;

    if (!videogameId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "ID de videojuego inválido" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: `No se ha encontrado ningún usuario con el id ${userId}`,
      });
    }
    const videogame = await Videogame.findById(videogameId);
    if (!videogame) {
      return res.status(404).json({
        error: `No se ha encontrado ningún videojuego con el id ${videogameId}`,
      });
    }
    // compruebo si el user ya tiene el juego en favs:
    const isFavorite = user.favoriteVideogames.some(
      (id) => id.toString() === videogameId
    );
    let message;
    let increment;
    if (isFavorite) {
      user.favoriteVideogames = user.favoriteVideogames.filter(
        (id) => id.toString() !== videogameId
      );
      message = "Videojuego eliminado de favoritos";
      increment = -1;
    } else {
      user.favoriteVideogames.push(videogameId);
      message = "Videojuego añadido a favoritos";
      increment = 1;
    }
    await user.save();
    // actualizo el contador de favs del juego:
    await Videogame.findByIdAndUpdate(
      videogameId,
      { $inc: { favsCount: increment } },
      { new: true }
    );
    return res.status(200).json({
      message,
      favorites: user.favoriteVideogames,
    });
  } catch (error) {
    return res.status(500).json({ error: "Error al actualizar favoritos" });
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    const usersResponse = users.map((user) => {
      const userResponse = user.toObject();
      delete userResponse.password;
      return userResponse;
    });
    return res.status(200).json({ users: usersResponse });
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ error: `No se ha encontrado ningún usuario con el id ${id}` });
    }
    const userResponse = user.toObject();
    delete userResponse.password;
    return res.status(200).json({ user: userResponse });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "ID de usuario inválido" });
    }
    return res.status(500).json({ error: "Error obteniendo el usuario" });
  }
};

module.exports = {
  register,
  login,
  editUser,
  deleteUser,
  changeRole,
  toggleFavorite,
  getUsers,
  getUser,
};
