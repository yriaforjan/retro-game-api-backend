const User = require("../api/models/user");
const { verifyToken } = require("../utils/token");

const isAuth = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "No autorizado" });

  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ error: "Usuario no encontrado" });

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "No autorizaado" });
  }
};

module.exports = isAuth;
