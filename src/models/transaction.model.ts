import mongoose, { Schema, model } from 'mongoose';

export interface TransactionDocument extends mongoose.Document {
	title: string;
	type: ("sale" | "buy" | "initial");
	amount: number;
	ownerRequest: string;
	secondPerson: string;
	date: Date;
}

const TransactionSchema = new Schema<TransactionDocument>({
	title: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
		min: 0,
	},
	ownerRequest: {
		type: String,
		require: true,
	},
	secondPerson: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	}
});


export default model<TransactionDocument>("Transaction", TransactionSchema);