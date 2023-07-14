/**
 * @file transaction.model.ts
 * @brief Definición del modelo de transacción (transaction).
 */
import mongoose, { Schema, model } from 'mongoose';

/**
 * @brief Interfaz que define el documento de la transacción (transaction).
 * @interface TransactionDocument
 * @extends mongoose.Document
 */
export interface TransactionDocument extends mongoose.Document {
	title: string;
	type: ("sale" | "buy" | "initial");
	amount: number;
	ownerRequest: string;
	secondPerson: string;
	date: Date;
}

/**
 * @brief Esquema de la transacción (transaction).
 * @type {Schema<TransactionDocument>}
 */
const TransactionSchema = new Schema<TransactionDocument>({
	title: {
		type: String,
		required: true,
		/**
		 * @brief Título de la transacción.
		 * @type {string}
		 */
	},
	type: {
		type: String,
		required: true,
		/**
		 * @brief Tipo de transacción.
		 * @type {("sale" | "buy" | "initial")}
		 */
	},
	amount: {
		type: Number,
		required: true,
		min: 0,
		/**
		 * @brief Monto de la transacción.
		 * @type {number}
		 */
	},
	ownerRequest: {
		type: String,
		require: true,
		/**
		 * @brief ID del propietario de la solicitud asociada a la transacción.
		 * @type {string}
		 */
	},
	secondPerson: {
		type: String,
		required: true,
		/**
		 * @brief ID de la segunda persona involucrada en la transacción.
		 * @type {string}
		 */
	},
	date: {
		type: Date,
		default: Date.now,
		/**
		 * @brief Fecha de la transacción.
		 * @type {Date}
		 */
	}
});

/**
 * @brief Modelo de la transacción (transaction).
 * @type {Model<TransactionDocument>}
 */
export default model<TransactionDocument>("Transaction", TransactionSchema);