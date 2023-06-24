import TransactionSchema, { TransactionDocument } from "../models/transaction.model";
import { ObjectId } from "mongoose";


// CREATE NEW USER
let create = async (transaction: TransactionDocument) => {
	try {
    return await transaction.save();
  } catch (error) {
    throw Error(`${error}`);
  }
}

// GET 
let getAll = async () => {
	try {
    return await TransactionSchema.find();
  } catch (error) {
    throw Error(`${error}`);
  }
}

let find = async (id: ObjectId) => {
	try {
    return await TransactionSchema.findById({ _id: id.path });
  } catch (error) {
    throw Error(`${error}`);
  }
}

// DELETE 
let deleteOne = async (id: ObjectId) => {
	try {
    return await TransactionSchema.findByIdAndDelete({ _id: id.path });
  } catch (error) {
    throw Error(`${error}`);
  }
}

let deleteAll = async () => {
	try {
    return (await TransactionSchema.deleteMany()).deletedCount;
  } catch (error) {
    throw Error(`${error}`);
  }
}


// UPDATE
let modify = async (transaction: TransactionDocument, id: ObjectId) => {
	try {
    return await TransactionSchema.findByIdAndUpdate({ _id: id.path }, transaction, { new: false });
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