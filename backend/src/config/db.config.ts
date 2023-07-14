/**
 * @file db.config.ts
 * @brief Datos para la conexión a la base de datos MongoDB.
 */

const user = "admin";
const password = "admin";

export = {
    PORT: 27017,
    HOST: "localhost",
    DB: "TFG",
    USER: user,
    PASSWORD: password,
    URL: `mongodb+srv://${user}:${password}@cluster0.dnskw8h.mongodb.net/app`,
};