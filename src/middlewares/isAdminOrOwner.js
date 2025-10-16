const isAdminOrOwner = (req, res, next) => {
  const requestId = req.user.id;
  const targetId = req.params.id;

  if (req.user.role === "admin" || requestId === targetId) {
    return next();
  }

  return res
    .status(403)
    .json({ error: "No tiene permisos para realizar esta acción" });
};

module.exports = isAdminOrOwner;
