import { Router } from "express";
import { userController as user} from "../controllers";

const userRouter = Router();

userRouter
  .route("/")
    .get(user.getAllUsers)
    .delete(user.deleteAllUsers);

userRouter
  .route("/username/:username")
    .get(user.findUserByName);

userRouter
  .route("/id/:id")
    .delete(user.deleteUserById)
    .get(user.findUserById)
    .patch(user.modifyUser);

userRouter
  .post("/register", user.register);

userRouter
  .post("/login", user.login);

export {
  userRouter
}