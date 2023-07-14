/**
 * @file user.model.ts
 * @brief Definición del modelo de usuario (user) para la base de datos. Se hace uso de Mongoose.
 */
import mongoose, { Schema, model } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import validator from 'validator';
import { WalletDocument } from './wallet.model';

/**
 * @brief Interfaz que define el documento del usuario (user).
 * @interface UserDocument
 * @extends mongoose.Document
 */
export interface UserDocument extends mongoose.Document {
	username: string;
	image: Buffer;
	credential: string;
	email: string;
	password: string,
	date: Date;
	wallet: WalletDocument;
	requests: [mongoose.Types.ObjectId];
	score: number;
	socketId: string;
}

/**
 * @brief Esquema del usuario (user).
 * @type {Schema<UserDocument>}
 */
const UserSchema = new Schema<UserDocument>({
	username: {
		type: String,
		unique: true,
		required: [true, "Es obligatorio el nombre."],
		min: 4,
		validate: {
			validator: function (value: string) { return (validator.isAlphanumeric(value, 'es-ES')) },
			message: "El username debe ser alfanumerico.",
		}
		/**
		 * @brief Nombre de usuario del usuario.
		 * @type {Buffer}
		 */
	},
	image: {
		type: Buffer,
		/**
		 * @brief Imagen del usuario.
		 * @type {Buffer}
		 */
	},
	credential: {
		type: String,
		required: [true, "Es obligatorio la credencial universitaria."],
		unique: true,
		validate: {
			validator: function (value: string) {
				return value.length === 13 && value.includes('alu') && (/^\D*(\d\D*){10}$/).test(value);
			},
			message: "La credencial no es valida.",
		}
		/**
		 * @brief Credencial universitaria del usuario.
		 * @type {string}
		 */
	},
	email: {
		type: String,
		required: [true, "Es obligatorio el email."],
		unique: true,
		validate: [isEmail, "No es un email valido."],
		/**
		 * @brief Email del usuario.
		 * @type {string}
		 */
	},
	password: {
		type: String,
		required: [true, "Es obligatorio poner una contraseña."],
		min: 4,
		max: 16,
		/**
		 * @brief Contraseña del usuario.
		 * @type {string}
		 */
	},
	date: {
		type: Date,
		default: Date.now,
		/**
		 * @brief Fecha de creación del usuario.
		 * @type {Date}
		 */
	},
	wallet: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Wallet",
		unique: true,
		/**
		 * @brief ID de cartera asociado al usuario.
		 * @type {WalletDocument}
		 */
	},
	requests: {
		type: [mongoose.Schema.Types.ObjectId],                        
		ref: "Request",
		default: [],
		/**
		 * @brief Array de ID de solicitudes asociadas al usuario.
		 * @type {[mongoose.Types.ObjectId]}
		 */
	},
	score: {
		type: Number,
		default: 0,
		min: 0,
		max: 5,
		/**
		 * @brief Puntuación del usuario.
		 * @type {number}
		 */
	},
	socketId: {
		type: String,
		require: true,
	},
});

export default model<UserDocument>("User", UserSchema);