import mongoose, { Schema } from 'mongoose';
import TransactionSchema, { TransactionDocument } from './transaction.model';


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
    type: [mongoose.Schema.Types.ObjectId],
    ref: "TransactionSchema",
  }
});


export default WalletSchema;