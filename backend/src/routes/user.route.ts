/**
 * @file user.route.ts
 * @brief Rutas de la API para gestionar las solicitudes.
 */
import { Router } from "express";
import { userController as user} from "../controllers";

/**
 * @brief Uso de la clase Router para enrutamiento de los usuarios.
 * @type {Router}
 */
const userRouter = Router();

/**
 * @brief Ruta que obtener todo los usuario.
 * 
 * @name GET /api/user/
 * @memberof userRouter
 * @function
 * @inner
 * @param {function} user.getAllUsers - Controlador para obtener a todos los usurios.
 * 
 * @name DELETE /api/user/
 * @memberof userRouter
 * @function
 * @inner
 * @param {function} user.deleteAllUsers - Controlador para eliminar todos los usurios.
 */
userRouter
  .route("/")
    .get(user.getAllUsers)
    .delete(user.deleteAllUsers);

/**
 * @brief Ruta que incluye el nombre del usuario.
 * @name GET /api/user/username/:username
 * @memberof userRouter
 * @function
 * @inner
 * @param {function} user.findUserByName - Controlador para obtener un usuario por su username.
 */
userRouter
  .route("/username/:username")
    .get(user.findUserByName);

/**
 * @brief Ruta que incluye el ID de un usuario.
 * 
 * @name DELETE /api/user/id/:id
 * @memberof userRouter
 * @function
 * @inner
 * @param {function} user.deleteUserById - Controlador para eliminar un usuario.
 * 
 * @name GET /api/user/id/:id
 * @memberof userRouter
 * @function
 * @inner
 * @param {function} user.findUserById - Controlador para obtener un usuario.
 * 
 * @name PATCH /api/user/id/:id
 * @memberof userRouter
 * @function
 * @inner
 * @param {function} user.modifyUser - Controlador para editar un usuario.
 */
userRouter
  .route("/id/:id")
    .delete(user.deleteUserById)
    .get(user.findUserById)
    .patch(user.modifyUser);

/**
 * @brief Ruta para crear un usuario.
 * @name POST /api/user/register
 * @memberof userRouter
 * @function
 * @inner
 * @param {function} user.register - Controlador para crear un usuario.
 */
userRouter
  .post("/register", user.register);

/**
 * @brief Ruta para iniciar sesión.
 * @name POST /api/user/login
 * @memberof userRouter
 * @function
 * @inner
 * @param {function} user.login - Controlador para que un usuario obtenga los datos para inicar sesión.
 */
userRouter
  .post("/login", user.login);

export {
  userRouter
}