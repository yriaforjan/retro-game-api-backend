require("dotenv").config();
const mongoose = require("mongoose");
const videogames = require("../../data/videogames");
const Videogame = require("../../api/models/videogame");

const runSeed = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    await Videogame.collection.drop();
    console.log("Videojuegos eliminados");
    await Videogame.insertMany(videogames);
    console.log("Películas inyectadas correctamente");
    await mongoose.disconnect();
    console.log("Desconexión exitosa de la base de datos");
  } catch (error) {
    console.log("Error: ", error);
  }
};

runSeed();
