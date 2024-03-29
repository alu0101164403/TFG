import { Request, Response } from "express";
import { walletServices as wallet } from "../services";
import WalletSchema, { WalletDocument } from "../models/wallet.model";
import mongoose from "mongoose";
import { transactionServices as transaction } from "../services";
import TransactionSchema, { TransactionDocument } from "../models/transaction.model";


// CREATE 
let create = async (req: Request, res: Response) => {	
	try {
		const transactionCreated: TransactionDocument = await transaction.create(new TransactionSchema ({
      type: "initial",
			title: "Bienvenido. Estas son tus monedas iniciales.",
			amount: 30,
			secondPerson: "LogoApp",
		}));
		const newWallet: WalletDocument = new WalletSchema ({
			history: [transactionCreated._id],
		});
		await wallet.create(newWallet);
		res.status(201).send({ message: "Succesfull created wallet." });
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}

// GET 
let getAll = async (req: Request, res: Response) => {
	try {
		const wallets = await wallet.getAll();
		res.status(200).send(wallets);
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}

let find = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const walletFound = await wallet.find(new mongoose.Schema.Types.ObjectId(id));
		res.status(200).send(walletFound);
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}


// DELETE 
let deleteOne = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await wallet.deleteOne(new mongoose.Schema.Types.ObjectId(id));
		res.status(200).send({message: "Wallet was deleted successfully!"});
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}

let deleteAll = async (req: Request, res: Response) => {
	try {
		const count = await wallet.deleteAll();
		res.status(200).send({message: count + " wallet was deleted successfully!"});
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}

// UPDATE
let modify = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const walletUpdated = await wallet.modify(req.body, id);
		res.status(200).send(walletUpdated);
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
