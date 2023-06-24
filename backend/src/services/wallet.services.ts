import WalletSchema, { WalletDocument } from "../models/wallet.model";
import { ObjectId } from "mongoose";


// CREATE
let create = async (wallet: WalletDocument) => {
	try {
    return await wallet.save();
  } catch (error) {
    throw Error(`${error}`);
  }
}

// GET 
let getAll = async () => {
	try {
    return await WalletSchema.find();
  } catch (error) {
    throw Error(`${error}`);
  }
}

let find = async (id: ObjectId) => {
	try {
    return await WalletSchema.findById({ _id: id.path });
  } catch (error) {
    throw Error(`${error}`);
  }
}

// DELETE 
let deleteOne = async (id: ObjectId) => {
	try {
    return await WalletSchema.findByIdAndDelete({ _id: id.path });
  } catch (error) {
    throw Error(`${error}`);
  }
}

let deleteAll = async () => {
	try {
    return (await WalletSchema.deleteMany()).deletedCount;
  } catch (error) {
    throw Error(`${error}`);
  }
}


// UPDATE
let modify = async (newWallet: Object, id: string) => {
	try {
    return await WalletSchema.findByIdAndUpdate({ _id: id }, newWallet, { new: true });
  } catch (error) {
    throw Error(`${error}`);
  }
}

export {
	create,
  getAll,
  deleteOne,
  deleteAll,
  modify,
  find,
}