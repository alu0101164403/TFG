import { Request, Response } from "express";
import { transactionServices as transaction } from "../services";
import TransactionSchema, { TransactionDocument } from "../models/transaction.model";
import mongoose, { ObjectId } from "mongoose";


// CREATE 
let create = async (req: Request, res: Response) => {	
	try {
		const { type, title, amount, secondPerson} = req.body;
		const newTransaction: TransactionDocument = new TransactionSchema ({
      type,
			title,
			amount,
			secondPerson,
		});
		await transaction.create(newTransaction);
		res.status(201).send({ message: "Succesfull created transaction." });
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}

// GET 
let getAll = async (req: Request, res: Response) => {
	try {
		const transactions = await transaction.getAll();
		res.status(200).send(transactions);
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}

let find = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const transactionFound = await transaction.find(new mongoose.Schema.Types.ObjectId(id));
		res.status(200).send(transactionFound);
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}


// DELETE 
let deleteOne = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await transaction.deleteOne(new mongoose.Schema.Types.ObjectId(id));
		res.status(200).send({message: "Transaction was deleted successfully!"});
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}

let deleteAll = async (req: Request, res: Response) => {
	try {
		const count = await transaction.deleteAll();
		res.status(200).send({message: count + " transaction was deleted successfully!"});
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}

// UPDATE
let modify = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await transaction.modify(req.body, new mongoose.Schema.Types.ObjectId(id));
		res.status(200).send({message: "User was update successfully!"});
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}


export {
	getAll,
	deleteOne,
	deleteAll,
	find,
	modify,
  create,
};
