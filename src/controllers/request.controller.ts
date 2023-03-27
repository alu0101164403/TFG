import { Request, Response } from "express";
import { requestServices as request } from "../services";
import { userServices as user } from "../services";
import RequestSchema, { RequestDocument } from "../models/request.model";
import mongoose, { ObjectId } from "mongoose";


// CREATE 
let create = async (req: Request, res: Response) => {
	console.log('soy create request')	
	try {
		const { type, title, description, category, owner, price} = req.body;
		console.log('owner', owner)
		const newRequest: RequestDocument = new RequestSchema ({
      type,
			title,
      description,
			category,
			owner,
			price,
		});
		console.log(newRequest)
		const requestSave = await request.create(newRequest);
		await user.addRequestUser(requestSave._id.toHexString(), owner.id);
		res.status(201).send({ message: "Succesfull created request." });
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}

// GET 
let getAll = async (req: Request, res: Response) => {
	console.log('soy getAll')
	try {
		const requests = await request.getAll();
		res.status(200).send(requests);
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}

let find = async (req: Request, res: Response) => {
	console.log('soy find')
	try {
		const { id } = req.params;
		const requestFound = await request.find(new mongoose.Schema.Types.ObjectId(id));
		res.status(200).send(requestFound);
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}

let findByUser = async (req: Request, res: Response) => {
	console.log('soy findByUser request');
	const { id } = req.params;
	const userFound = await user.findUser(new mongoose.Schema.Types.ObjectId(id));
	let requestUser;
	if (userFound) {
		try {
			requestUser = await Promise.all(
				userFound.requests.map(async idRequest => {
					return await request.find(new mongoose.Schema.Types.ObjectId(idRequest.toHexString()));
				})
			);
			console.log('u', requestUser);
			res.status(200).send(requestUser);
		} catch (error) {
			res.status(500).json({ status: 500, message: error.message });
		}
	}
}

// DELETE 
let deleteOne = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await request.deleteOne(new mongoose.Schema.Types.ObjectId(id));
		res.status(200).send({message: "Request was deleted successfully!"});
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}

let deleteAll = async (req: Request, res: Response) => {
	try {
		const { user} = req.body;
		let count;
		if(user) {
			console.log('delete- owner', user)
			count = await request.deleteAll(new mongoose.Schema.Types.ObjectId(user));
		} else {
			console.log('todas')
			count = await request.deleteAll();
		}
		res.status(200).send({message: count + " request was deleted successfully!"});
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}

// UPDATE
let modify = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await request.modify(req.body, new mongoose.Schema.Types.ObjectId(id));
		res.status(200).send({message: "Request was update successfully!"});
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}


export {
	getAll,
	findByUser,
	deleteOne,
	deleteAll,
	find,
	modify,
  create,
};
