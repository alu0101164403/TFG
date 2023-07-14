/**
 * @file wallet.services.ts
 * @brief Ooperaciones relacionadas con las cartera (wallets) en la base de datos.
 */
import WalletSchema, { WalletDocument } from "../models/wallet.model";
import { ObjectId } from "mongoose";


/**
 * @brief Crea una nueva cartera.
 * @param wallet - Datos de la cartera a crear.
 * @return Promesa que se resuelve con el documento de la cartera creada.
 * @throws Error si ocurre algún error durante la creación de la cartera.
 */
let create = async (wallet: WalletDocument) => {
	try {
    return await wallet.save();
  } catch (error) {
    throw Error(`${error}`);
  }
}

/**
 * @brief Obtiene todas las carteras.
 * @return Promesa que se resuelve con un arreglo de documentos de las carteras encontradas.
 * @throws Error si ocurre algún error durante la obtención de las carteras.
 */
let getAll = async () => {
	try {
    return await WalletSchema.find();
  } catch (error) {
    throw Error(`${error}`);
  }
}

/**
 * @brief Encuentra una cartera por su ID.
 * @param id - ID de la cartera a encontrar.
 * @return Promesa que se resuelve con el documento de la cartera encontrada, o null si no se encuentra ninguna cartera con el ID especificado.
 * @throws Error si ocurre algún error durante la búsqueda de la cartera.
 */
let find = async (id: ObjectId) => {
	try {
    return await WalletSchema.findById({ _id: id.path });
  } catch (error) {
    throw Error(`${error}`);
  }
}

/**
 * @brief Elimina una cartera por su ID.
 * @param id - ID de la cartera a eliminar.
 * @return Promesa que se resuelve con el documento de la cartera eliminada.
 * @throws Error si ocurre algún error durante la eliminación de la cartera.
 */
let deleteOne = async (id: ObjectId) => {
	try {
    return await WalletSchema.findByIdAndDelete({ _id: id.path });
  } catch (error) {
    throw Error(`${error}`);
  }
}

/**
 * @brief Elimina todas las carteras.
 * @return Promesa que se resuelve con la cantidad de carteras eliminadas.
 * @throws Error si ocurre algún error durante la eliminación de las carteras.
 */
let deleteAll = async () => {
	try {
    return (await WalletSchema.deleteMany()).deletedCount;
  } catch (error) {
    throw Error(`${error}`);
  }
}

/**
 * @brief Modifica una cartera por su ID.
 * @param newWallet - Nueva información de la cartera a modificar.
 * @param id - ID de la cartera a modificar.
 * @return Promesa que se resuelve con el documento de la cartera modificada.
 * @throws Error si ocurre algún error durante la modificación de la cartera.
 */
let modify = async (newWallet: Object, id: string) => {
	try {
    return await WalletSchema.findByIdAndUpdate({ _id: id }, newWallet, { new: true });
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