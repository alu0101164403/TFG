/**
 * @file index.ts
 * @brief Archivo principal de la aplicación backend. Crea el servidor HTTP y realiza las conexiones con la base de datos.
 */

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


app.use(cors({
    origin:"*"
}));
/**
 * @brief Configuración de middleware adicional.
 */
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/**
 * @brief Variables de entorno para almacenar puerto y dirección IP del servidor.
 */
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 8080;
const HOST_NAME: string = process.env.URL || '127.0.0.1';
/**
 * @brief Variable de entorno para almacenar la URL de conexión a la base de datos MongoDB.
 */
const DB_URL = process.env.DB_URL || db.URL;

/**
 * @brief Configuración de middleware adicional.
 */
app.use(function (req, res, next) {
    next();
  });

/**
 * @brief Middleware para acceder al contenido de las solicitudes como JSON.
 */ 
app.use(bodyParser.json());

/**
 * @brief Middleware para analizar el contenido de las solicitudes con formato application/x-www-form-urlencoded. Usa la libreria querystring.
 */
app.use(bodyParser.urlencoded({ extended: false }));


/**
 * @brief Ruta principal de la aplicación.
 */
app.get("/", (_, res) => {
    res.send("Hola, esto es el backend.");
});

/**
 * @brief Rutas de la API REST.
 */
app.use("/api/user", userRouter);
app.use("/api/transaction", transactionRouter);
app.use("/api/request", requestRouter);
app.use("/api/wallet", walletRouter);
app.use("/api/message", chatRouter);


/**
 * @brief Creación del servidor HTTP.
 */
const server = http.createServer(app);


/*export const io = new Server(server);
// Generates random string as the ID
const generateID = () => Math.random().toString(36).substring(2, 10);
const chatLists: { id: string; chatName: string; messages: []; }[] = [];
app.get("/chatLsit", (req, res) => {
    res.json(chatLists);
}); */

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


/**
 * @brief Inicia el servidor y escucha en el puerto y dirección especificados.
 */
server.listen(PORT, HOST_NAME, () => {
    const { port, address } = server.address() as AddressInfo;
    console.log(`Express server is listening at http://${address}:${port}.`); 
});

// opcion stricta para consulta, para evitar que devuelva todos los objetso en consultas vacias
mongoose.set('strictQuery', true);

/**
 * @brief Conexión a la base de datos MongoDB Atlas usando las variables de entorno.
 */
mongoose.connect(DB_URL, {
}).then(() => {
    console.log("Successfully connect to MongoDB address:" + DB_URL);
}).catch(err => {
    console.error("Connection error", err);
});
