const {
  getVideogames,
  getVideogame,
  postVideogame,
  editVideogame,
  deleteVideogame,
  searchVideogames,
} = require("../controllers/videogame");
const isAuth = require("../../middlewares/isAuth");
const uploadCover = require("../../middlewares/coverImg");

const videogamesRouter = require("express").Router();

videogamesRouter.get("/", getVideogames);
videogamesRouter.get("/search", searchVideogames);
videogamesRouter.get("/:id", getVideogame);

videogamesRouter.post("/", isAuth, uploadCover.single("coverImg"), postVideogame);
videogamesRouter.put("/:id", isAuth, uploadCover.single("coverImg"), editVideogame);
videogamesRouter.delete("/:id", isAuth, deleteVideogame);

module.exports = videogamesRouter;
