import mongoose, { Schema, model } from 'mongoose';


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


const RequestSchema = new Schema<RequestDocument>({
	type: {
		type: String,
		require: true,
		enum: ["request", "offer"],
	},
	active: {
		type: Boolean,
		default: true,
	},
	title: {
		type: String,
		require: true,
	},
	description: {  
		type: String,
		require: true,
	},
	owner: {
		type: {id: mongoose.Types.ObjectId, username: String},
		ref: 'User',
		require: true,
	},
	category: {
		type: String,
	},
	price: {
		type: Number,
		require: true,
		default: 1,
		min: 1,
	},
	date: {
		type: Date,
		default: Date.now,
	}
});


export default model<RequestDocument>("Request", RequestSchema);