import { Request, Response } from "express";
import { requestServices as request } from "../services";
import RequestSchema, { RequestDocument } from "../models/request.model";
import mongoose, { ObjectId } from "mongoose";


// CREATE 
let create = async (req: Request, res: Response) => {	
	try {
		const { type, title, description, category, owner} = req.body;
		const newRequest: RequestDocument = new RequestSchema ({
      type,
			title,
      description,
			category,
			owner,
		});
		await request.create(newRequest);
		res.status(201).send({ message: "Succesfull created request." });
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}

// GET 
let getAll = async (req: Request, res: Response) => {
	try {
		const requests = await request.getAll();
		res.status(200).send(requests);
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}

let find = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const requestFound = await request.find(new mongoose.Schema.Types.ObjectId(id));
		res.status(200).send(requestFound);
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}


// DELETE 
let deleteOne = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await request.deleteOne(new mongoose.Schema.Types.ObjectId(id));
		res.status(200).send({message: "request was deleted successfully!"});
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}

let deleteAll = async (req: Request, res: Response) => {
	try {
		const count = await request.deleteAll();
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
	deleteOne,
	deleteAll,
	find,
	modify,
  create,
};
