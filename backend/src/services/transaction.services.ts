/**
 * @file transaction.services.ts
 * @brief Operaciones para gestionar la base de datos de las transacciones (transactions).
 */
import TransactionSchema, { TransactionDocument } from "../models/transaction.model";
import { ObjectId } from "mongoose";


/**
 * @brief Crea una nueva transacción.
 * @param transaction - Documento con los datos de la transacción a crear.
 * @return Promesa que se resuelve con el documento de la transacción creada.
 * @throws Error si ocurre algún error durante la creación de la transacción.
 */
let create = async (transaction: TransactionDocument) => {
	try {
    return await transaction.save();
  } catch (error) {
    throw Error(`${error}`);
  }
}

/**
 * @brief Obtiene todas las transacciones.
 * @return Promesa que se resuelve con un arreglo de documentos de las transacciones encontradas.
 * @throws Error si ocurre algún error durante la obtención de las transacciones.
 */
let getAll = async () => {
	try {
    return await TransactionSchema.find();
  } catch (error) {
    throw Error(`${error}`);
  }
}

/**
 * @brief Encuentra una transacción por su ID.
 * @param id - ID de la transacción a encontrar.
 * @return Promesa que se resuelve con el documento de la transacción encontrada, o null si no se encuentra ninguna transacción con el ID especificado.
 * @throws Error si ocurre algún error durante la búsqueda de la transacción.
 */
let find = async (id: ObjectId) => {
	try {
    return await TransactionSchema.findById({ _id: id.path });
  } catch (error) {
    throw Error(`${error}`);
  }
}

/**
 * @brief Elimina una transacción por su ID.
 * @param id - ID de la transacción a eliminar.
 * @return Promesa que se resuelve con el documento de la transacción eliminada.
 * @throws Error si ocurre algún error durante la eliminación de la transacción.
 */
let deleteOne = async (id: ObjectId) => {
	try {
    return await TransactionSchema.findByIdAndDelete({ _id: id.path });
  } catch (error) {
    throw Error(`${error}`);
  }
}

/**
 * @brief Elimina todas las transacciones.
 * @return Promesa que se resuelve con la cantidad de transacciones eliminadas.
 * @throws Error si ocurre algún error durante la eliminación de las transacciones.
 */
let deleteAll = async () => {
	try {
    return (await TransactionSchema.deleteMany()).deletedCount;
  } catch (error) {
    throw Error(`${error}`);
  }
}


/**
 * @brief Modifica una transacción por su ID.
 * @param transaction - Datos de la transacción modificada.
 * @param id - ID de la transacción a modificar.
 * @return Promesa que se resuelve con el documento de la transacción modificada.
 * @throws Error si ocurre algún error durante la modificación de la transacción.
 */
let modify = async (transaction: TransactionDocument, id: ObjectId) => {
	try {
    return await TransactionSchema.findByIdAndUpdate({ _id: id.path }, transaction, { new: false });
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