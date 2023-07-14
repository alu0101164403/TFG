/**
 * @file user.services.ts
 * @brief Operaciones relacionadas con los usuarios (users) en la base de datos.
 */
import UserSchema, { UserDocument } from "../models/user.model";
import { ObjectId } from "mongoose";


/**
 * @brief Guarda un nuevo usuario.
 * @param user - Documento del usuario a crear.
 * @return Promesa que se resuelve con el documento del usuario creado.
 * @throws Error si ocurre algún error durante la creación del usuario.
 */
let create = async (user: UserDocument) => {
	try {
    return await user.save();
  } catch (error) {
    throw Error(`${error}`);
  }
}


/**
 * @brief Elimina un usuario por su ID.
 * @param id - ID del usuario a eliminar.
 * @return Promesa que se resuelve con el documento del usuario eliminado.
 * @throws Error si ocurre algún error durante la eliminación del usuario.
 */
let deleteUser = async (id: ObjectId) => {
	try {
    return await UserSchema.findByIdAndDelete({ _id: id.path });
  } catch (error) {
    throw Error(`${error}`);
  }
}

/**
 * @brief Elimina todos los usuarios.
 * @return Promesa que se resuelve con la cantidad de usuarios eliminados.
 * @throws Error si ocurre algún error durante la eliminación de los usuarios.
 */
let deleteAllUsers = async () => {
	try {
    return (await UserSchema.deleteMany()).deletedCount;
  } catch (error) {
    throw Error(`${error}`);
  }
}

/**
 * @brief Obtiene todos los usuarios.
 * @return Promesa que se resuelve con un arreglo de documentos de los usuarios encontrados.
 * @throws Error si ocurre algún error durante la obtención de los usuarios.
 */
let getUsers = async () => {
	try {
    return await UserSchema.find();
  } catch (error) {
    throw Error(`${error}`);
  }
}

/**
 * @brief Encuentra un usuario por su ID.
 * @param id - ID del usuario a encontrar.
 * @return Promesa que se resuelve con el documento del usuario encontrado, o null si no se encuentra ningún usuario con el ID especificado.
 * @throws Error si ocurre algún error durante la búsqueda del usuario.
 */
let findUser = async (id: ObjectId) => {
	try {
    return await UserSchema.findById({ _id: id.path });
  } catch (error) {
    throw Error(`Usuario no encontrado.`);
  }
}

/**
 * @brief Encuentra un usuario por su nombre de usuario cargando los datos de su cartera y solicitudes.
 * @param username - Nombre de usuario del usuario a encontrar.
 * @return Promesa que se resuelve con el documento del usuario encontrado, o null si no se encuentra ningún usuario con el nombre de usuario especificado.
 * @throws Error si ocurre algún error durante la búsqueda del usuario.
 */
let findUserByName = async (username: string) => {
	try {
    return await UserSchema.findOne({ username: username }).populate('wallet').populate('requests');
  } catch (error) {
    throw Error(`Usuario no encontrado: ${error}`);
  }
}

/**
 * @brief Encuentra un usuario por su ID y carga su cartera (wallet).
 * @param id - ID del usuario a encontrar.
 * @return Promesa que se resuelve con el documento del usuario encontrado con su cartera cargada, o null si no se encuentra ningún usuario con el ID especificado.
 * @throws Error si ocurre algún error durante la búsqueda del usuario.
 */
let findUserWithWallet = async (id: ObjectId) => {
	try {
    return await UserSchema.findById({ _id: id.path }).populate('wallet');
  } catch (error) {
    throw Error(`Usuario no encontrado: ${error}`);
  }
}

/**
 * @brief Modifica un usuario por su ID.
 * @param user - Datos del usuario modificado.
 * @param id - ID del usuario a modificar.
 * @return Promesa que se resuelve con el documento del usuario modificado.
 * @throws Error si ocurre algún error durante la modificación del usuario.
 */
let modifyUser = async (user: UserDocument, id: ObjectId) => {
	try {
    return await UserSchema.findByIdAndUpdate({ _id: id.path }, user, { new: true });
  } catch (error) {
    throw Error(`${error}`);
  }
}

/**
 * @brief Agrega una solicitud (request) a la lista de solicitudes de un usuario por su ID.
 * @param requestId - ID de la solicitud a agregar.
 * @param userId - ID del usuario al que se agrega la solicitud.
 * @return Promesa que se resuelve con el documento del usuario con la solicitud agregada.
 * @throws Error si ocurre algún error durante la adición de la solicitud al usuario.
 */
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