import mongoose, { Schema } from 'mongoose';


export interface RequestDocument extends mongoose.Document {
	type: ("request" | "offer");
	title: string;
	description: string;
	owner: mongoose.Schema.Types.ObjectId;
	category: String;
}


const RequestSchema = new Schema<RequestDocument>({
	type: {
		type: String,
		require: true,
		enum: ["request", "offer"],
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
		type: mongoose.Schema.Types.ObjectId,
		require: true,
	},
	category: {
		type: String,
	}
});


export default RequestSchema;