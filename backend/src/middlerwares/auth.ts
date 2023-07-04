/* const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const { TokenExpiredError } = jwt;
const User = require('../models/user.model');

// errors
const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
  }

  return res.sendStatus(401).send({ message: "Unauthorized!" });
}

// verifica el toke enviado 
exports.verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.user = decoded;
    next();
  });
};
 */