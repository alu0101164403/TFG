import { Request, Response } from "express";

import { io } from "../index";
import ChatSchema, { ChatDocument } from "../models/chatMessage.model";
import chatServices from "../services/message.services";
import mongoose from "mongoose";

const saveMessage = async (req: Request, res: Response) => {
  const {receiver, emitter, message, dataTime} = req.body;
  const newMessage: ChatDocument = new ChatSchema ({
    emitter,
    receiver,
    message,
    dataTime,
  });
  try {
    const messageSaved = await chatServices.save(newMessage);
    io.to(receiver).emit('receiveMessage', messageSaved);
    res.status(201).send(messageSaved); 
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Error al enviar mensaje'});
  }
};

const get = async (req: Request, res: Response) => {
  try {
		const requests = await chatServices.get();
		res.status(200).send(requests);
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}

const deleteAll = async (req: Request, res: Response) => {
  try {
		const requests = await chatServices.deleteAll();
		res.status(200).send(requests);
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}   

const getMessages = async () => {

};

export default {
  saveMessage,
  get,
  deleteAll,
  getMessages,
};
