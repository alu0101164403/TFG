import mongoose, { Schema, model } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import WalletSchema, { WalletDocument } from "./wallet.model";
import validator from 'validator';


export interface UserDocument extends mongoose.Document {
	username: string;
	image: Buffer;
	credential: string;
	email: string;
	password: string,
	date: Date;
	wallet: WalletDocument;
	requests: [mongoose.Schema.Types.ObjectId];
	score: number;
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
			message: "El uername debe ser alfanumerico.",
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
				if ( value.length === 13 && value.includes('alu') && (/^\D*(\d\D*){10}$/).test(value)) {
					return true;
				} else return false;
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
		type: WalletSchema,
		ref: "WalletSchema",
		idWallet: mongoose.Schema.Types.ObjectId, 
		unique: true,
	},
	requests: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: "Request",
	},
	score: {
		type: Number,
		default: 0,
		min: 0,
		max: 5,
	}
});

export default model<UserDocument>("User", UserSchema);