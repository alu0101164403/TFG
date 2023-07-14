/**
 * @file request.route.ts
 * @brief Rutas de la API para gestionar las solicitudes.
 */
import { Router } from "express";
import { requestController as request} from "../controllers";
import { verifyToken } from "../middlerwares/auth";

/**
 * @brief Uso de la clase Router para enrutamiento de las solicitudes.
 * @type {Router}
 */
const requestRouter = Router();

/**
 * @brief Ruta para crear u obtener todas las solicitudes de la base de datos.
 * 
 * @name POST /api/request/
 * @memberof requestRouter
 * @function
 * @inner
 * @param {function} request.create - Controlador para crear una solicitud.
 * 
 * @name DELETE /api/request/
 * @memberof requestRouter
 * @function
 * @inner
 * @param {function} request.deleteAll - Controlador para eliminar todas las solicitudes.
 * 
 * @name GET /api/request/
 * @memberof requestRouter
 * @function
 * @inner
 * @param {function} request.getAll - Controlador para obtener todas las solicitudes existentes.
 */
requestRouter  
  .route("/")
    .post(request.create)
    .delete(request.deleteAll)
    .get(request.getAll);

/**
 * @brief Ruta que incluye el ID de la solicitud para buscar/eliminar/modificar una solicitud específica buscandola por su ID.
 * 
 * @name DELETE /api/request/id/:id
 * @memberof requestRouter
 * @function
 * @inner
 * @param {function} verifyToken - Middleware para verificar el token de autenticación comprobando si es válido y no ha caducado.
 * @param {function} request.deleteOne - Controlador para eliminar una solicitud específica.
 * 
 * @name GET /api/request/id/:id
 * @memberof requestRouter
 * @function
 * @inner
 * @param {function} request.find - Controlador para buscar la solicitud.
 * 
 * @name PATCH /api/request/id/:id
 * @memberof requestRouter
 * @function
 * @inner
 * @param {function} verifyToken - Middleware para verificar el token de autenticación comprobando si es válido y no ha caducado.
 * @param {function} request.modify - Controlador para modificar la solicitud.
 * 
 */
requestRouter
  .route("/id/:id")
    .delete([verifyToken], request.deleteOne)
    .get(request.find)
    .patch([verifyToken], request.modify);

/**
 * @brief Ruta que incluye el ID de un usuario para obtener todas las solicitudes de un usuario específico buscandolo por su ID.
 * @name GET /api/request/owner/:id
 * @memberof requestRouter
 * @function
 * @inner
 * @param {function} request.findByUser - Controlador para buscar todas las solicitudes de un usuario en concreto.
 */
requestRouter
  .route("/owner/:id")
    .get(request.findByUser);

export {
  requestRouter
}