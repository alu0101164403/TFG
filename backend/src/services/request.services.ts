/**
 * @file request.services.ts
 * @brief Realiza las operaciones a la base de datos relacionadas con las solicitudes (requests).
 */
import RequestSchema, { RequestDocument } from "../models/request.model";
import { ObjectId } from "mongoose";


/**
 * @brief Crea una nueva solicitud.
 * @param request - Datos con la información a almacenar de la solicitud.
 * @return Promesa que se resuelve con el documento de la solicitud creada.
 * @throws Error si ocurre algún error durante la creación de la solicitud.
 */
let create = async (request: RequestDocument) => {
	try {
    return await request.save();
  } catch (error) {
    throw Error(`Error al crear Request: ${error}`);
  }
}

/**
 * @brief Obtiene todas las solicitudes.
 * @return Promesa que se resuelve con un arreglo de documentos de las solicitudes encontradas.
 * @throws Error si ocurre algún error durante la obtención de las solicitudes.
 */
let getAll = async () => {
	try {
    return await RequestSchema.find();
  } catch (error) {
    throw Error(`${error}`);
  }
}

/**
 * @brief Encuentra una solicitud por su ID.
 * @param id - ID de la solicitud a encontrar.
 * @return Promesa que se resuelve con el documento de la solicitud encontrada, o null si no se encuentra ninguna solicitud con el ID especificado.
 * @throws Error si ocurre algún error durante la búsqueda de la solicitud.
 */
let find = async (id: ObjectId) => {
	try {
    return await RequestSchema.findById({ _id: id.path });
  } catch (error) {
    throw Error(`${error}`);
  }
}

/**
 * @brief Elimina una solicitud por su ID.
 * @param id - ID de la solicitud a eliminar.
 * @return Promesa que se resuelve con el documento de la solicitud eliminada.
 * @throws Error si ocurre algún error durante la eliminación de la solicitud.
 */
let deleteOne = async (id: ObjectId) => {
	try {
    return await RequestSchema.findByIdAndDelete({ _id: id.path });
  } catch (error) {
    throw Error(`${error}`);
  }
}

/**
 * @brief Elimina todas las solicitudes.
 * @param id - (Opcional) ID del propietario de las solicitudes a eliminar. Si se proporciona, se eliminarán solo las solicitudes del propietario especificado; de lo contrario, se eliminarán todas las solicitudes.
 * @return Promesa que se resuelve con la cantidad de solicitudes eliminadas.
 * @throws Error si ocurre algún error durante la eliminación de las solicitudes.
 */
let deleteAll = async (id?: ObjectId) => {
	try {
    if(id) {
      return (await RequestSchema.deleteMany({ owner: id})).deletedCount;
    } else {
      return (await RequestSchema.deleteMany()).deletedCount;
    }
  } catch (error) {
    throw Error(`${error}`);
  }
}


/**
 * @brief Modifica una solicitud por su ID.
 * @param request - Datos de la solicitud modificada.
 * @param id - ID de la solicitud a modificar.
 * @return Promesa que se resuelve con el documento de la solicitud modificada.
 * @throws Error si ocurre algún error durante la modificación de la solicitud.
 */
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