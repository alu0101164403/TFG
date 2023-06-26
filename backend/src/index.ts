import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as http from "http";
import * as mongoose from "mongoose";
import {Server} from 'socket.io';

import { AddressInfo } from "net";

import db from "./config/db.config";
import{ 
    userRouter,
    requestRouter,
    walletRouter,
    transactionRouter,
    chatRouter,
} from "./routes";
require('dotenv').config();

const app = express();

// cors es una politica para permitir el acceso a los recursos
const corsOptions ={
    origin:'http://127.0.0.1:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(
    corsOptions
));

// SEREVER ENV-VAR
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 8080;
const HOST_NAME: string = process.env.URL || '127.0.0.1';
// MONGO ENV-VAR
const DB_URL = process.env.DB_URL || db.URL;

app.use(function (req, res, next) {
    next();
  });

// parse requests of content-type - application/json
// bodyparse permite el acceso al contenido del body 
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
// con false se usa la libreria querystring, a true se usaria qs
app.use(bodyParser.urlencoded({ extended: false }));


// simple route
app.get("/", (_, res) => {
    res.send("Hola, esto es el backend.");
});

// api rest
app.use("/api/user", userRouter);
app.use("/api/transaction", transactionRouter);
app.use("/api/request", requestRouter);
app.use("/api/wallet", walletRouter);
app.use("/api/message", chatRouter);


// set port and url, listen for requests (puerto u url del backend)
const server = http.createServer(app);
export const io = new Server(server);
// Generates random string as the ID
const generateID = () => Math.random().toString(36).substring(2, 10);
const chatLists: { id: string; chatName: string; messages: []; }[] = [];
app.get("/chatLsit", (req, res) => {
    res.json(chatLists);
});

// Manejar conexiones de Socket.io
/* io.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on("createChat", (chatName) => {
        socket.join(chatName);
        // Adds the new group name to the chat rooms array
        chatLists.unshift({ id: generateID(), chatName, messages: [] });
        // Returns the updated chat rooms via another event
        socket.emit("chatsList", chatLists);
    });
    socket.on("findRoom", (id) => {
        // Filters the array by the ID
        let result = chatLists.filter((room) => room.id == id);
        // Sends the messages to the app
        socket.emit("foundRoom", result[0].messages);
    });
    socket.on("newMessage", (data) => {
        // Destructures the property from the object
        const { room_id, message, user, timestamp } = data;
    
        // Finds the room where the message was sent
        let result = chatLists.filter((room) => room.id == room_id);
    
        // Create the data structure for the message
        const newMessage = {
            id: generateID(),
            text: message,
            user,
            time: `${timestamp.hour}:${timestamp.mins}`,
        };
        // Updates the chatroom messages
        socket.to(result[0].chatName).emit("roomMessage", newMessage);
        result[0].messages.push(newMessage);
    
        // Trigger the events to reflect the new changes
        socket.emit("roomsList", chatLists);
        socket.emit("foundRoom", result[0].messages);
    });
    socket.on('disconnect', () => {
        socket.disconnect()
        console.log('🔥: A user disconnected');
    });
}); */

server.listen(PORT, HOST_NAME, () => {
    const { port, address } = server.address() as AddressInfo;
    console.log(`Express server is listening at http://${address}:${port}.`); 
});

// opcion stricta para consulta, para evitar que devuelva todos los objetso en consultas vacias
mongoose.set('strictQuery', true);

// conection to mongoDB Atlas, collection app
mongoose.connect(DB_URL, {
}).then(() => {
    console.log("Successfully connect to MongoDB address:" + DB_URL);
}).catch(err => {
    console.error("Connection error", err);
});
