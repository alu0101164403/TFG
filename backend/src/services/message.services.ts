import ChatSchema, { ChatDocument } from "../models/chatMessage.model";

// SAVE NEW MESSAGE
let save = async (message: ChatDocument) => {
	try {
    return await message.save();
  } catch (error) {
    throw Error(`${error}`);
  }
}

// GET MESSAGES BETWEEN TWO USERS

const get = async () => {
	try {
    return await ChatSchema.find();
  } catch (error) {
    throw Error(`${error}`);
  }
}

const deleteAll = async () => {
  try {
    return await ChatSchema.deleteMany();
  } catch (error) {
    throw Error(`${error}`);
  }
}

export default {
  save,
  deleteAll,
  get,
}