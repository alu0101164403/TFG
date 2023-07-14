import jwt from "jsonwebtoken";
import config from "../config/auth.config";
import { Response, NextFunction } from "express";
const { TokenExpiredError } = jwt;

// errores
const catchError = (err: any, res: Response) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
  }
  return res.status(401).send({ message: "Unauthorized!" });
}

// verifica el toke enviado 
const verifyToken = (req: any, res: Response, next: NextFunction) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, config.secret, (err: any, decoded: any) => {
    if (err) {
      return catchError(err, res);
    }
    req.user = decoded;
    next();
  });
};

export {
  verifyToken,
}