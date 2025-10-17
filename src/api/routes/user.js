const isAdmin = require("../../middlewares/isAdmin");
const isAdminOrOwner = require("../../middlewares/isAdminOrOwner");
const isAuth = require("../../middlewares/isAuth");
const uploadAvatar = require("../../middlewares/avatarImg");
const {
  register,
  login,
  editUser,
  deleteUser,
  changeRole,
  toggleFavorite,
  getUsers,
  getUser,
} = require("../controllers/user");
const UsersRouter = require("express").Router();

UsersRouter.post("/register", uploadAvatar.single("avatar"), register);
UsersRouter.post("/login", login);

UsersRouter.put("/favorites/toggle/:videogameId", isAuth, toggleFavorite);
UsersRouter.put("/:id/role", isAuth, isAdmin, changeRole); // Este ID es el del usuario a quien quiero cambiar el rol

UsersRouter.put(
  "/:id",
  isAuth,
  isAdminOrOwner,
  uploadAvatar.single("avatar"),
  editUser
);
UsersRouter.delete("/:id", isAuth, isAdminOrOwner, deleteUser);
UsersRouter.get("/:id", isAuth, isAdmin, getUser);

UsersRouter.get("/", isAuth, isAdmin, getUsers);

module.exports = UsersRouter;
