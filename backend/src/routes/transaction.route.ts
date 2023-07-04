import { Router } from "express";
import { transactionController as transaction} from "../controllers";

const transactionRouter = Router();

transactionRouter
  .route("/")
    .get(transaction.getAll);

transactionRouter
  .route("/id/:id")
    .get(transaction.find)
    .post(transaction.addCoins);

transactionRouter
  .route("/transfer")
    .post(transaction.buy);

export {
  transactionRouter
}