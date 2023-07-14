/**
 * @file transaction.route.ts
 * @brief Rutas de la API para gestionar las solicitudes.
 */
import { Router } from "express";
import { transactionController as transaction} from "../controllers";

/**
 * @brief Uso de la clase Router para enrutamiento de las transacciones.
 * @type {Router}
 */
const transactionRouter = Router();

/**
 * @brief Ruta para obtener todas las transacción.
 * @name GET /api/transaction/
 * @memberof transactionRouter
 * @function
 * @inner
 * @param {function} transaction.getAll - Controlador para buscar las transacciones.
 */
transactionRouter
  .route("/")
    .get(transaction.getAll);

/**
 * @brief Ruta que incluye el ID de un usuario.
 * 
 * @name GET /api/transaction/id/:id
 * @memberof transactionRouter
 * @function
 * @inner
 * @param {function} transaction.find - Controlador para buscar las transacciones de un usuario.
 * 
 * @name POST /api/transaction/id/:id
 * @memberof transactionRouter
 * @function
 * @inner
 * @param {function} transaction.addCoins - Controlador para añadir monedas a la cartera de un usuario.
 */
transactionRouter
  .route("/id/:id")
    .get(transaction.find)
    .post(transaction.addCoins);

/**
 * @brief Ruta para realizar las transferencias entre usuarios.
 * @name POST /api/transaction/transfer
 * @memberof transactionRouter
 * @function
 * @inner
 * @param {function} transaction.buy - Controlador para realizar las transacciones.
 */
transactionRouter
  .route("/transfer")
    .post(transaction.buy);

export {
  transactionRouter
}