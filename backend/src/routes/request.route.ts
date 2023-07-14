import { Router } from "express";
import { requestController as request} from "../controllers";
import { verifyToken } from "../middlerwares/auth";

const requestRouter = Router();

requestRouter  
  .route("/")
    .post(request.create)
    .delete(request.deleteAll)
    .get(request.getAll);

requestRouter
  .route("/id/:id")
    .delete([verifyToken], request.deleteOne)
    .get(request.find)
    .patch([verifyToken], request.modify);

requestRouter
  .route("/owner/:id")
    .get(request.findByUser);

export {
  requestRouter
}