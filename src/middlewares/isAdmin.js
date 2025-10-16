const isAdmin = (req, res, next) => {
  req.user && req.user.role === "admin"
    ? next()
    : res
        .status(403)
        .json({ error: "Prohibido. Require permisos de administrador" });
};

module.exports = isAdmin;
