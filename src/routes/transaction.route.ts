import { Router } from "express";
import { transactionController as transaction} from "../controllers";

const transactionRouter = Router();

transactionRouter  
  .route("/")
    .post(transaction.create)
    .delete(transaction.deleteAll)
    .get(transaction.getAll);

transactionRouter
  .route("/id/:id")
    .delete(transaction.deleteOne)
    .get(transaction.find)
    .patch(transaction.modify);


export {
  transactionRouter
}