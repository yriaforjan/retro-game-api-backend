const isAdmin = require("../../middlewares/isAdmin");
const isAdminOrOwner = require("../../middlewares/isAdminOrOwner");
const isAuth = require("../../middlewares/isAuth");
const upload = require("../../middlewares/file");
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

UsersRouter.post("/register", upload.single("avatar"), register);
UsersRouter.post("/login", login);
UsersRouter.put(
  "/:id",
  isAuth,
  isAdminOrOwner,
  upload.single("avatar"),
  editUser
);
UsersRouter.delete("/:id", isAuth, isAdminOrOwner, deleteUser);
UsersRouter.put("/:id/role", isAuth, isAdmin, changeRole); // Este ID es el del usuario a quien quiero cambiar el rol
UsersRouter.put("/favorites/toggle/:videogameId", isAuth, toggleFavorite);
UsersRouter.get("/", isAuth, isAdmin, getUsers);
UsersRouter.get("/:id", isAuth, isAdmin, getUser);

module.exports = UsersRouter;
