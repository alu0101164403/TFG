import { Request, Response } from "express";
import { walletServices as wallet } from "../services";
import WalletSchema, { WalletDocument } from "../models/wallet.model";
import mongoose, { ObjectId } from "mongoose";


// CREATE 
let create = async (req: Request, res: Response) => {	
	try {
		const { type, title, amount, secondPerson} = req.body;
		const newWallet: WalletDocument = new WalletSchema ({});
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
		await wallet.modify(req.body, new mongoose.Schema.Types.ObjectId(id));
		res.status(200).send({message: "Wallet was update successfully!"});
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
