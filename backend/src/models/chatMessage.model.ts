import mongoose, { Schema, model } from 'mongoose';


export interface ChatDocument extends mongoose.Document {
	emitter: mongoose.Schema.Types.ObjectId;
	receiver: mongoose.Schema.Types.ObjectId;
	message: string;
  dataTime: Date;

}


const ChatSchema = new Schema<ChatDocument>({
	emitter: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
	},
	receiver: {  
		type: mongoose.Schema.Types.ObjectId,
		require: true,
	},
	message: {
		type: String,
	},
	dataTime: {
		type: Date,
		default: new Date(),
	}
});


export default model<ChatDocument>("Chat", ChatSchema);