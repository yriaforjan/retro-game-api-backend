const isAdmin = require("../../middlewares/isAdmin");
const isAdminOrOwner = require("../../middlewares/isAdminOrOwner");
const isAuth = require("../../middlewares/isAuth");
const {
  register,
  login,
  deleteUser,
  changeRole,
  toggleFavorite,
} = require("../controllers/user");

const UsersRouter = require("express").Router();

UsersRouter.post("/register", register);
UsersRouter.post("/login", login);
UsersRouter.put("/favorites/toggle/:videogameId", isAuth, toggleFavorite);
UsersRouter.put("/:id/role", isAuth, isAdmin, changeRole); // Este ID es el del usuario a quien quiero cambiar el rol
UsersRouter.delete("/:id", isAuth, isAdminOrOwner, deleteUser);

module.exports = UsersRouter;
