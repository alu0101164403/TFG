import { Router } from "express";
import { walletController as wallet} from "../controllers";

const walletRouter = Router();

walletRouter  
  .route("/")
    .post(wallet.create)
    .delete(wallet.deleteAll)
    .get(wallet.getAll);

walletRouter
  .route("/id/:id")
    .delete(wallet.deleteOne)
    .get(wallet.find)
    .patch(wallet.modify);


export {
  walletRouter
}