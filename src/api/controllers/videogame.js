const Videogame = require("../models/videogame");

const getVideogames = async (req, res, next) => {
  try {
    const videogames = await Videogame.find();
    return res.status(200).json({ videogames });
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener los videojuegos" });
  }
};

const getVideogame = async (req, res, next) => {
  const { id } = req.params;
  try {
    const videogame = await Videogame.findById(id);
    if (!videogame) {
      return res.status(404).json({
        error: `No se ha encontrado ningún videojuego con el id ${id}`,
      });
    }
    return res.status(200).json({ videogame });
  } catch (error) {
    return res.status(500).json({ error: "Error obteniendo el videojuego" });
  }
};

const postVideogame = async (req, res, next) => {
  try {
    const newVideogame = new Videogame(req.body);
    const savedVideogame = await newVideogame.save();
    return res.status(201).json({
      message: "Videojuego creado con éxito",
      videogame: savedVideogame,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: "Datos de videojuego inválidos." });
    }
    return res.status(500).json({ error: "Error al crear el videojuego" });
  }
};

const editVideogame = async (req, res, next) => {
  const { id } = req.params;
  try {
    const editedVideogame = await Videogame.findByIdAndUpdate(id, req.body, {
      new: true, // Con esto se devuelve el documento modificado
      runValidators: true, //Con esto se realizan las validaciones del esquema
    });
    if (!editedVideogame) {
      return res.status(404).json({
        error: `No se ha encontrado ningún videojuego con el id ${id}`,
      });
    }
    return res.status(200).json({
      message: "Videojuego editado con éxito",
      videogame: editedVideogame,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: "Datos de videojuego inválidos." });
    }
    return res.status(500).json({ error: "Error al editar el videojuego" });
  }
};

const deleteVideogame = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedVideogame = await Videogame.findByIdAndDelete(id);
    if (!deletedVideogame) {
      return res.status(404).json({
        error: `No se ha encontrado ningún videojuego con el id ${id}`,
      });
    }
    return res.status(200).json({
      message: "Videojuego eliminado con éxito",
      videogame: deletedVideogame,
    });
  } catch (error) {
    return res.status(500).json({ error: "Error al eliminar el videojuego" });
  }
};

module.exports = {
  getVideogames,
  getVideogame,
  postVideogame,
  editVideogame,
  deleteVideogame,
};
