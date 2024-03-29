import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import UserSchema, { UserDocument } from "../models/user.model";
import WalletSchema, { WalletDocument } from "../models/wallet.model";
import TransactionSchema, { TransactionDocument } from "../models/transaction.model";
import mongoose, { ObjectId } from "mongoose";
import config from "../config/auth.config";
import { userServices as user } from "../services";
import { walletServices as wallet } from "../services";
import { transactionServices as transaction } from "../services";
import RequestSchema, { RequestDocument } from "../models/request.model";

// POST
let register = async (req: Request, res: Response) => {	
	try {
		const { username, email, credential } = req.body;
		// cifrar contraseña
		const salt: string = await bcrypt.genSalt(10);
		const password:string = await bcrypt.hash(req.body.password, salt);
		//
		const transactionCreated: TransactionDocument = await transaction.create(new TransactionSchema ({
      type: "initial",
			title: "Bienvenido. Estas son tus monedas iniciales.",
			amount: 30,
			secondPerson: "LogoApp",
		}));
		const walletCreated: WalletDocument = await wallet.create(new WalletSchema ({
			history: [transactionCreated._id],
		}));
		//
		const newUser: UserDocument = new UserSchema ({
			username,
			email,
			credential,
			password,
			wallet: walletCreated._id,
		});
		await user.create(newUser);
		res.status(201).send({ message: "Succesfull created user." });
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}



// LOGIN
let login = async (req: Request, res: Response) => {
	try {
		const { username } =  req.body;
		const userFound: UserDocument | null = await user.findUserByName(username);

		if (userFound === null) {
			res.status(400).json({ error: 'User not found.' });
		} else {
			bcrypt.compare(req.body.password, userFound.password, async function(err, result) {
				if (err) {
					res.status(500).json({ message: err });
				} else if (result === false) {
					res.status(403).json({ message: 'Contraseña incorrecta.' });
				} else 
				{
					const token = jwt.sign({
						name: userFound.username,
						id: userFound._id,
					}, config.secret, {
						expiresIn: config.jwtExpiration,
					});
					res.status(200).header('x-access-token', token).json({
						data: {
							accessToken: token,
							id: userFound._id,
							username: userFound.username,
							email: userFound.email,
							credential: userFound.credential,
							requests: userFound.requests,
							wallet: userFound.wallet,
						}
					});
				}
			});
		}
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}



// DELETE 
let deleteUserById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		// eliminar un usuario elimina su cartera y sus requests
		const userFound = await user.findUser(new mongoose.Schema.Types.ObjectId(id));
		if (!userFound) {
      return res.status(404).send();
    }
		await wallet.deleteOne(userFound.wallet.id);
		await RequestSchema.deleteMany({owner: id});
		await user.deleteUser(new mongoose.Schema.Types.ObjectId(id));
		res.status(200).send({message: "User was deleted successfully!"});
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}


let deleteAllUsers = async (req: Request, res: Response) => {
	try {
		const count = await user.deleteAllUsers();
		res.status(200).send({message: count + " users was deleted successfully!"});
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}



// GET
let findUserById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const userFound = await user.findUser(new mongoose.Schema.Types.ObjectId(id));
		res.status(200).send(userFound);
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}

let getAllUsers = async (req: Request, res: Response) => {
	try {
		const users = await user.getUsers();
		res.status(200).send(users);
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}

let findUserByName = async (req: Request, res: Response) => {
	try {
		const { username } = req.params;
		const userFound = await user.findUserByName(username);
		res.status(200).send(userFound);
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}

// PATCH
let modifyUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await user.modifyUser(req.body, new mongoose.Schema.Types.ObjectId(id));
		res.status(200).send({message: "User was update successfully!"});
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}

export {
	register,
	getAllUsers,
	findUserById,
	findUserByName,
	deleteUserById,
	deleteAllUsers,
	modifyUser,
	login,
};
