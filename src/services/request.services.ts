import RequestSchema, { RequestDocument } from "../models/request.model";
import { ObjectId } from "mongoose";


// CREATE
let create = async (request: RequestDocument) => {
	try {
    return await request.save();
  } catch (error) {
    throw Error(`${error}`);
  }
}

// GET 
let getAll = async () => {
	try {
    return await RequestSchema.find();
  } catch (error) {
    throw Error(`${error}`);
  }
}

let find = async (id: ObjectId) => {
	try {
    return await RequestSchema.findById({ _id: id.path });
  } catch (error) {
    throw Error(`${error}`);
  }
}

// DELETE 
let deleteOne = async (id: ObjectId) => {
	try {
    return await RequestSchema.findByIdAndDelete({ _id: id.path });
  } catch (error) {
    throw Error(`${error}`);
  }
}

let deleteAll = async () => {
	try {
    return (await RequestSchema.deleteMany()).deletedCount;
  } catch (error) {
    throw Error(`${error}`);
  }
}


// UPDATE
let modify = async (request: RequestDocument, id: ObjectId) => {
	try {
    return await RequestSchema.findByIdAndUpdate({ _id: id.path }, request, { new: true });
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