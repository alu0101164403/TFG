import { Router } from "express";
import { walletController as wallet} from "../controllers";

const walletRouter = Router();

/**
 * @brief Ruta buscar todas las carteras.
 * 
 * @name POST /api/wallet/
 * @memberof walletRouter
 * @function
 * @inner
 * @param {function} wallet.create - Controlador para crear una cartera.
 * 
 * @name DELETE /api/wallet/
 * @memberof walletRouter
 * @function
 * @inner
 * @param {function} wallet.deleteAll - Controlador para eliminar todas las carteras.
 * 
 * @name GET /api/wallet/
 * @memberof walletRouter
 * @function
 * @inner
 * @param {function} wallet.getAll - Controlador para obtener todas las carteras.
 */
walletRouter  
  .route("/")
    .post(wallet.create)
    .delete(wallet.deleteAll)
    .get(wallet.getAll);


/**
 * @brief Ruta que incluye el ID de una cartera.
 * 
 * @name DELETE /api/wallet/
 * @memberof walletRouter
 * @function
 * @inner
 * @param {function} wallet.deleteOne - Controlador para eliminar una cartera.
 * 
 * @name GET /api/wallet/
 * @memberof walletRouter
 * @function
 * @inner
 * @param {function} wallet.find - Controlador para bucar una cartera.
 * 
 * @name PATCH /api/wallet/
 * @memberof walletRouter
 * @function
 * @inner
 * @param {function} wallet.modify - Controlador para editar una cartera.
 */
walletRouter
  .route("/id/:id")
    .delete(wallet.deleteOne)
    .get(wallet.find)
    .patch(wallet.modify);


export {
  walletRouter
}