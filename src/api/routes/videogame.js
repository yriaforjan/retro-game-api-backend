const {
  getVideogames,
  getVideogame,
  postVideogame,
  editVideogame,
  deleteVideogame,
} = require("../controllers/videogame");
const isAuth = require("../../middlewares/isAuth");

const videogamesRouter = require("express").Router();

videogamesRouter.get("/", getVideogames);
videogamesRouter.get("/:id", getVideogame);
videogamesRouter.post("/", isAuth, postVideogame);
videogamesRouter.put("/:id", isAuth, editVideogame);
videogamesRouter.delete("/:id", isAuth, deleteVideogame);

module.exports = videogamesRouter;
