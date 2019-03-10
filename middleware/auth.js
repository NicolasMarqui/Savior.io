const secret = require("../config/keys").jwtSecret;
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) res.status(401).json({ msg: "Você não permissão para isso" });

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token Inválido" });
  }
}

module.exports = auth;
