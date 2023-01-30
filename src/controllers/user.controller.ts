import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { userServices as user } from "../services";
import UserSchema, { UserDocument } from "../models/user.model";
import mongoose, { ObjectId } from "mongoose";
import config from "../config/auth.config";


// CREATE NEW USER
let register = async (req: Request, res: Response) => {	
	try {
		const { username, email, credential} = req.body;
		// cifrar contraseña
		const salt = await bcrypt.genSalt(10);
		const password = await bcrypt.hash(req.body.password, salt);
		//
		const newUser: UserDocument = new UserSchema ({
			username,
			email,
			credential,
			password,
		});
		await user.create(newUser);
		res.status(201).send({ message: "Succesfull created user." });
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}

// GET ALL USERS
let getUsers = async (req: Request, res: Response) => {
	try {
		const users = await user.getUsers();
		res.status(200).send(users);
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}

// DELETE USER
let deleteUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await user.deleteUser(new mongoose.Schema.Types.ObjectId(id));
		res.status(200).send({message: "User was deleted successfully!"});
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}

// DELETE USERS
let deleteAllUsers = async (req: Request, res: Response) => {
	try {
		const count = await user.deleteAllUsers();
		res.status(200).send({message: count + " users was deleted successfully!"});
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}

// FIND USER
let findUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const userFound = await user.findUser(new mongoose.Schema.Types.ObjectId(id));
		res.status(200).send(userFound);
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}

// FIND USER
let findUserByName = async (req: Request, res: Response) => {
	try {
		const { username } = req.params;
		const userFound = await user.findUserByName(username);
		res.status(200).send(userFound);
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}

// FIND USER
let modifyUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await user.modifyUser(req.body, new mongoose.Schema.Types.ObjectId(id));
		res.status(200).send({message: "User was update successfully!"});
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}

// LOGIN USER
let login = async (req: Request, res: Response) => {
	try {
		const { username } =  req.body;
		const userFound: UserDocument | null = await user.findUserByName(username);

		if (userFound === null) {
			res.status(400).json({ error: 'User not found.' });
		} else {
			bcrypt.compare(req.body.password, userFound.password, async function(err) {
				if (err) {
					res.status(403).json({ message: err });
				} else {
					const token = jwt.sign({
						name: userFound.username,
						id: userFound._id,
					}, config.secret, {
						expiresIn: config.jwtExpiration,
					});
					res.status(200).header('x-access-token', token).json({
						data: {
							accessToken: token,
							username: userFound.username,
							email: userFound.email,
							credential: userFound.credential,
						}
					});
				}
			});
		}
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}



export {
	register,
	getUsers,
	deleteUser,
	deleteAllUsers,
	findUser,
	findUserByName,
	modifyUser,
	login,
};
