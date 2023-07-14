/**
 * @file auth.ts
 * @brief Middleware para la autenticación y verificación de tokens.
 */
import jwt from "jsonwebtoken";
import config from "../config/auth.config";
import { Response, NextFunction } from "express";
const { TokenExpiredError } = jwt;

/**
 * @brief Maneja los errores relacionados con los tokens.
 * @param err - Error que se produjo.
 * @param res - Objeto de respuesta HTTP.
 */
const catchError = (err: any, res: Response) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
  }
  return res.status(401).send({ message: "Unauthorized!" });
}

/**
 * @brief Verifica el token enviado en la solicitud.
 * @param req - Objeto de solicitud HTTP.
 * @param res - Objeto de respuesta HTTP.
 * @param next - Función para pasar al siguiente middleware.
 */
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