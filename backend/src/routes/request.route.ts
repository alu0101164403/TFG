import { Router } from "express";
import { requestController as request} from "../controllers";

const requestRouter = Router();

requestRouter  
  .route("/")
    .post(request.create)
    .delete(request.deleteAll)
    .get(request.getAll);

requestRouter
  .route("/id/:id")
    .delete(request.deleteOne)
    .get(request.find)
    .patch(request.modify);

requestRouter
  .route("/owner/:id")
    .get(request.findByUser);

export {
  requestRouter
}