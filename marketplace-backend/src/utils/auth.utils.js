const jwt = require("jsonwebtoken");

exports.verifyToken = (req) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return { error: "Token requerido" };

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { userId: decoded.userId, rol: decoded.rol };
  } catch (error) {
    return { error: "Token inválido o expirado" };
  }
};

exports.isAdmin = (rol) => {
  return (
    typeof rol === "string" && rol.trim().toLowerCase() === "administrador"
  );
};