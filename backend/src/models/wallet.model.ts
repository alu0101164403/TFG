/**
 * @file wallet.model.ts
 * @brief Definición del modelo de la cartera (wallet) para la base de datos. Se hace uso de Mongoose.
 */
import mongoose, { Schema, model } from 'mongoose';

/**
 * @brief Interfaz que define el documento de la cartera (wallet). Cada cartera almacena el número de monedas que tiene y ina lista de ID de las transacciones ligadas a ese usuario.
 * @interface WalletDocument
 * @extends mongoose.Document
 */
export interface WalletDocument extends mongoose.Document {
  coins: number;
  history: [mongoose.Schema.Types.ObjectId];
}

/**
 * @brief Esquema de la cartera (wallet).
 * @type {Schema<WalletDocument>}
 */
const WalletSchema = new Schema<WalletDocument>({
  coins: {
    type: Number,
    default: 30,
    min: 0,
  },
  history: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "transaction",
  }
});

/**
 * @brief Modelo de la cartera (wallet).
 * @type {Model<WalletDocument>}
 */
export default model<WalletDocument>("Wallet", WalletSchema);