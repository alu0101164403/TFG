import { Router } from "express";
import chat from "../controllers/chatMessages.controller";

const chatRouter = Router();

chatRouter
  .route("/")
    .get(chat.get)
    .delete(chat.deleteAll)
    .post(chat.saveMessage);

chatRouter
  .route("/:emitterId/:receiveId")
    .get(chat.getMessages);


export {
  chatRouter
}