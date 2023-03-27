import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as http from "http";
import * as mongoose from "mongoose";

import { AddressInfo } from "net";

import db from "./config/db.config";
import{ 
    userRouter,
    transactionRouter,
    requestRouter,
    walletRouter
} from "./routes";

const app = express();

// SEREVER ENV-VAR
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 8080;
const HOST_NAME: string = process.env.URL || '127.0.0.1';
// MONGO ENV-VAR
const DB_URL = process.env.DB_URL || db.URL;

app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
  });

// cors es una politica para permitir el acceso a los recursos
app.use(cors());

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
app.use("/user", userRouter);
app.use("/transaction", transactionRouter);
app.use("/request", requestRouter);
app.use("/wallet", walletRouter);



// set port and url, listen for requests (puerto u url del backend)
const server = http.createServer(app);
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
