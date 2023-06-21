import mongoose, { Schema, model } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import validator from 'validator';
import walletModel, { WalletDocument } from './wallet.model';


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

// estructura que tendra el docuemento json
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
	},
	image: {
		type: Buffer,
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
	},
	email: {
		type: String,
		required: [true, "Es obligatorio el email."],
		unique: true,
		validate: [isEmail, "No es un email valido."],
	},
	password: {
		type: String,
		required: [true, "Es obligatorio poner una contraseña."],
		min: 4,
		max: 16,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	wallet: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Wallet",
		unique: true,
	},
	requests: {
		type: [mongoose.Schema.Types.ObjectId],                        
		ref: "Request",
		default: [],
	},
	score: {
		type: Number,
		default: 0,
		min: 0,
		max: 5,
	},
	socketId: {
		type: String,
		require: true,
	},
});

export default model<UserDocument>("User", UserSchema);