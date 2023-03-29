import { Router } from "express";
import { transactionController as transaction} from "../controllers";

const transactionRouter = Router();

transactionRouter
  .route("/transfer")
    .post(transaction.buy);

export {
  transactionRouter
}