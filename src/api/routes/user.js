const isAdmin = require("../../middlewares/isAdmin");
const isAuth = require("../../middlewares/isAuth");
const {
  register,
  login,
  toggleFavorite,
  changeRole,
} = require("../controllers/user");

const UsersRouter = require("express").Router();

UsersRouter.post("/register", register);
UsersRouter.post("/login", login);
UsersRouter.put("/favorites/toggle/:videogameId", isAuth, toggleFavorite);
UsersRouter.put("/:id/role", isAuth, isAdmin, changeRole); // Este ID es el del usuario a quien quiero cambiar el rol

module.exports = UsersRouter;
