import { Router } from "express";
import { userController as user} from "../controllers";

const userRouter = Router();

userRouter
  .route("/")
    .get(user.getUsers)
    .delete(user.deleteAllUsers);

userRouter
  .route("/:username")
    .get(user.findUserByName)

userRouter
  .route("/:id")
    .delete(user.deleteUser)
    .get(user.findUser)
    .patch(user.modifyUser);

userRouter
  .post("/register", user.register);

userRouter
  .post("/login", user.login);


export {
  userRouter
}