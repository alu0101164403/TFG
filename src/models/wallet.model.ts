import mongoose, { Schema } from 'mongoose';
import TransactionSchema, { TransactionDocument } from './history.model';


export interface WalletDocument extends mongoose.Document {
  coins: number;
  history: [TransactionDocument];
}

const WalletSchema = new Schema<WalletDocument>({
  coins: {
    type: Number,
    default: 30,
    min: 0,
  },
  history: {
    type: [TransactionSchema],
    ref: "TransactionSchema",
  }
});


export default WalletSchema;