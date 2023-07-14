/**
 * @file request.model.ts
 * @brief Definición del modelo de solicitud (request).
 */
import mongoose, { Schema, model } from 'mongoose';

/**
 * @brief Interfaz que define el documento de la solicitud (request).
 * @interface RequestDocument
 * @extends mongoose.Document
 */
export interface RequestDocument extends mongoose.Document {
	type: ("request" | "offer"); // request => compra, offer => venta
	title: string;
	active: boolean;
	description: string;
	owner: {id: mongoose.Types.ObjectId, username: string};
	category: String;
	price: number;
	date: Date;
}

/**
 * @brief Esquema de la solicitud (request).
 * @type {Schema<RequestDocument>}
 */
const RequestSchema = new Schema<RequestDocument>({
	type: {
		type: String,
		require: true,
		enum: ["request", "offer"],
		/**
		 * @brief Tipo de solicitud.
		 * @type {("request" | "offer")}
		 */
	},
	active: {
		type: Boolean,
		default: true,
		/**
		 * @brief Estado de la solicitud.
		 * @type {boolean}
		 */
	},
	title: {
		type: String,
		require: true,
		/**
		 * @brief Título de la solicitud.
		 * @type {string}
		 */
	},
	description: {  
		type: String,
		require: true,
		/**
		 * @brief Descripción de la solicitud.
		 * @type {string}
		 */
	},
	owner: {
		type: {id: mongoose.Types.ObjectId, username: String},
		ref: 'User',
		require: true,
		/**
		 * @brief Propietario de la solicitud.
		 * @type {{id: mongoose.Types.ObjectId, username: string}}
		 */
	},
	category: {
		type: String,
		/**
		 * @brief Categoría de la solicitud.
		 * @type {string}
		 */
	},
	price: {
		type: Number,
		require: true,
		default: 1,
		min: 1,
		/**
		 * @brief Precio de la solicitud.
		 * @type {number}
		 */
	},
	date: {
		type: Date,
		default: Date.now,
		/**
		 * @brief Fecha de creacion de la solicitud.
		 * @type {Date}
		 */
	}
});

/**
 * @brief Modelo de la solicitud (request).
 * @type {Model<RequestDocument>}
 */
export default model<RequestDocument>("Request", RequestSchema);