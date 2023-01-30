import UserSchema, { UserDocument } from "../models/user.model";
import { ObjectId } from "mongoose";


// CREATE NEW USER
let create = async (user: UserDocument) => {
	try {
    return await user.save();
  } catch (error) {
    throw Error(`${error}`);
  }
}

// GET ALL USERS
let getUsers = async () => {
	try {
    return await UserSchema.find();
  } catch (error) {
    throw Error(`${error}`);
  }
}

// DELETE USER
let deleteUser = async (id: ObjectId) => {
	try {
    return await UserSchema.findByIdAndDelete({ _id: id.path });
  } catch (error) {
    throw Error(`${error}`);
  }
}

// DELETE ALL USERS
let deleteAllUsers = async () => {
	try {
    return (await UserSchema.deleteMany()).deletedCount;
  } catch (error) {
    throw Error(`${error}`);
  }
}

// FIND USER
let findUser = async (id: ObjectId) => {
	try {
    return await UserSchema.findById({ _id: id.path });
  } catch (error) {
    throw Error(`${error}`);
  }
}

// FIND USER
let findUserByName = async (username: string) => {
	try {
    return await UserSchema.findOne({ username: username });
  } catch (error) {
    throw Error(`${error}`);
  }
}

// UPDATE USER
let modifyUser = async (user: UserDocument, id: ObjectId) => {
	try {
    return await UserSchema.findByIdAndUpdate({ _id: id.path }, user, { new: false });
  } catch (error) {
    throw Error(`${error}`);
  }
}

export {
	create,
  getUsers,
  deleteUser,
  deleteAllUsers,
  modifyUser,
  findUser,
  findUserByName
}