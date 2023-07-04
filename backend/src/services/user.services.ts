import UserSchema, { UserDocument } from "../models/user.model";
import { ObjectId } from "mongoose";


// POST 
let create = async (user: UserDocument) => {
	try {
    return await user.save();
  } catch (error) {
    throw Error(`${error}`);
  }
}



// DELETE 
let deleteUser = async (id: ObjectId) => {
	try {
    return await UserSchema.findByIdAndDelete({ _id: id.path });
  } catch (error) {
    throw Error(`${error}`);
  }
}

let deleteAllUsers = async () => {
	try {
    return (await UserSchema.deleteMany()).deletedCount;
  } catch (error) {
    throw Error(`${error}`);
  }
}



// GET 
let getUsers = async () => {
	try {
    return await UserSchema.find();
  } catch (error) {
    throw Error(`${error}`);
  }
}

let findUser = async (id: ObjectId) => {
	try {
    return await UserSchema.findById({ _id: id.path });
  } catch (error) {
    throw Error(`Usuario no encontrado.`);
  }
}

let findUserByName = async (username: string) => {
	try {
    return await UserSchema.findOne({ username: username }).populate('wallet').populate('requests');
  } catch (error) {
    throw Error(`Usuario no encontrado: ${error}`);
  }
}

let findUserWithWallet = async (id: ObjectId) => {
	try {
    return await UserSchema.findById({ _id: id.path }).populate('wallet');
  } catch (error) {
    throw Error(`Usuario no encontrado: ${error}`);
  }
}

// PATCH 
let modifyUser = async (user: UserDocument, id: ObjectId) => {
	try {
    return await UserSchema.findByIdAndUpdate({ _id: id.path }, user, { new: true });
  } catch (error) {
    throw Error(`${error}`);
  }
}

let addRequestUser = async (requestId: ObjectId, userId: ObjectId) => {
	try {
    return await UserSchema.findByIdAndUpdate(
      userId, 
      { $addToSet: { requests: requestId } },
      { new: true }
    );
  } catch (error) {
    throw Error('No se pudo añadir la Request al usuario: ' + userId);
  }
}





export {
	create,
  getUsers,
  deleteUser,
  deleteAllUsers,
  modifyUser,
  findUser,
  findUserByName,
  addRequestUser,
  findUserWithWallet,
}