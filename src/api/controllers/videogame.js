const Videogame = require("../models/videogame");
const deleteFile = require("../../utils/deleteFile");

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
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Formato de id incorrecto" });
    }
    return res.status(500).json({ error: "Error obteniendo el videojuego" });
  }
};

const postVideogame = async (req, res, next) => {
  try {
    const videogameExists = await Videogame.findOne({ title: req.body.title });
    if (videogameExists) {
      if (req.file) deleteFile(req.file.path);
      return res.status(400).json({
        error: "Ya existe un videojuego registrado con ese título",
      });
    }
    const videogame = new Videogame(req.body);
    if (req.file) videogame.coverImg = req.file.path;
    const savedVideogame = await videogame.save();
    return res.status(201).json({
      message: "Videojuego creado con éxito",
      videogame: savedVideogame,
    });
  } catch (error) {
    if (req.file) deleteFile(req.file.path);
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: "Datos de videojuego incorrectos" });
    }
    return res.status(500).json({ error: "Error al crear el videojuego" });
  }
};

const editVideogame = async (req, res, next) => {
  const { id } = req.params;
  try {
    const videogame = await Videogame.findById(id);
    if (!videogame) {
      if (req.file) deleteFile(req.file.path); // borramos nueva portada si hay error
      return res.status(404).json({
        error: `No se ha encontrado ningún videojuego con el id ${id}`,
      });
    }
    // si manda nueva portada:
    if (req.file) req.body.coverImg = req.file.path; // actualizamos url

    const editedVideogame = await Videogame.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (req.file && videogame.coverImg) deleteFile(videogame.coverImg);
    return res.status(200).json({
      message: "Videojuego editado con éxito",
      videogame: editedVideogame,
    });
  } catch (error) {
    if (req.file) deleteFile(req.file.path);
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({ error: "Datos de videojuego inválidos" });
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
    if (deletedVideogame.coverImg) deleteFile(deletedVideogame.coverImg);
    return res.status(200).json({
      message: "Videojuego eliminado con éxito",
      videogame: deletedVideogame,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Datos de vdeojuego inválidos" });
    }
    return res.status(500).json({ error: "Error al eliminar el videojuego" });
  }
};

const searchVideogames = async (req, res, next) => {
  try {
    const { title, console, genre, year } = req.query;
    const filter = {};

    if (title) filter.title = { $regex: title, $options: "i" };
    if (console) filter.console = console;
    if (genre) filter.genres = genre;
    if (year) filter.year = Number(year);

    const videogames = await Videogame.find(filter);

    return res.status(200).json({ videogames });
  } catch (error) {
    return res.status(500).json({ error: "Error al buscar videojuegos" });
  }
};

module.exports = {
  getVideogames,
  getVideogame,
  postVideogame,
  editVideogame,
  deleteVideogame,
  searchVideogames,
};
