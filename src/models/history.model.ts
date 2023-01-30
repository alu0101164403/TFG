import mongoose, { Schema } from 'mongoose';

export interface TransactionDocument extends mongoose.Document {
	title: string;
	type: ("sale" | "buy");
	amount: number;
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
	},
	secondPerson: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		require: true,
		default: Date.now,
	}
});


export default TransactionSchema;