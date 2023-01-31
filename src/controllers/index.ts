/**
 * encargados de procesar las peticiones y 
 * devolver la informacion
 */

import * as userController from "./user.controller";
import * as transactionController from "./transaction.controller";
import * as requestController from "./request.controller";
import * as walletController from "./wallet.controller";


export {
    userController,
    transactionController,
    requestController,
    walletController
}