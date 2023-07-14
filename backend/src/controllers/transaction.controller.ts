/**
 * @file transaction.controller.ts
 * @brief Controlador para las operaciones relacionadas con las transacciones.
 */
import { Request, Response } from "express";
import { transactionServices as transaction } from "../services";
import { userServices as user } from "../services";
import { requestServices as request } from "../services";
import { walletServices as wallet } from "../services";

import TransactionSchema, { TransactionDocument } from "../models/transaction.model";
import mongoose from "mongoose";

/**
 * Gestiona la transferencia de monedas entre dos usuarios.
 * Crea la transaccion para los dos usuarios y actualiza los datos del historial y el numero de monedas para cada uno.
 * @param {Request} req - Objeto con los datos del usuario y monto a añadir.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
const buy = async (req: Request, res: Response) => {
  const {buyer, sellerId, requestId} = req.body;
  // comprobar existencia usuarios y request
  let userBuyer = await user.findUserWithWallet(new mongoose.Schema.Types.ObjectId(buyer.id));
  let userSeller = await user.findUserWithWallet(new mongoose.Schema.Types.ObjectId(sellerId));
  let requestFound = await request.find(new mongoose.Schema.Types.ObjectId(requestId));

  if (userBuyer && userSeller && requestFound) {
    // comrpobar saldo comprador
    const {price, type, title, owner} = requestFound;
    if (userBuyer.wallet.coins >= price && type === "offer") {
			// realizar transferencia
			const transactionCreated: TransactionDocument = await transaction.create(new TransactionSchema ({
				type: "request",
				title: title,
				amount: price,
				ownerRequest: owner,
				secondPerson: userSeller.username,
			}));
			let buyerHistory = userBuyer.wallet.history;
			buyerHistory.push(transactionCreated._id);
			let buyerWallet = {"coins": userBuyer.wallet.coins - price, "history": buyerHistory}
			//
			const transactionCreated2: TransactionDocument = await transaction.create(new TransactionSchema ({
				type: "offer",
				title: title,
				amount: price,
				secondPerson: userBuyer.username,
			}));
			let sellerHistory = userSeller.wallet.history;
			sellerHistory.push(transactionCreated2._id);
			let sellerWallet = {"coins": userSeller.wallet.coins + price, "history": sellerHistory}
			const walletUpdated = await wallet.modify(buyerWallet, userBuyer.wallet._id);
			await wallet.modify(sellerWallet, userSeller.wallet._id);
			buyer.wallet = walletUpdated;
			res.status(200).send(buyer);
		} else {
			res.status(500).send({ message: "No tiene saldo suficiente." });
		}
  } else {
    res.status(500).send({ message: "Ha ocurrido un error en el proceso." });
  }
}

/**
 * Añade monedas a la cartera de un usuario.
 * Tras encontrar al usuario, crea la transaccion y actualiza la lista de transacciones del usuario y actualiza la cartera con el nuevo numero de monedas.
 * @param {Request} req - Objeto con los datos del usuario y monto a añadir.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
let addCoins = async (req:Request, res: Response) => {
	const { id } = req.params;
	const { amount } = req.body;
	let userFound = await user.findUserWithWallet(new mongoose.Schema.Types.ObjectId(id));
	if (userFound) {
		let transactionCreated: TransactionDocument;
		try {
			transactionCreated = await transaction.create(new TransactionSchema ({
				type: "offer",
				title: 'Compra monedas',
				amount: amount,
				secondPerson: 'TiendaApp',
			}));
			let newHistory = userFound.wallet.history;
			newHistory.push(transactionCreated._id);
			let newWallet = {"coins": userFound.wallet.coins + amount, "history": newHistory};
			wallet.modify(newWallet, userFound.wallet._id).then(data => {
				res.status(201).send(data);
			}).catch(error => {
				res.status(500).json({ status: 500, message: error.message });
			});
		} catch (error) {
			res.status(500).json({ status: 500, message: error.message });
		}
	} else {
		res.status(500).send({ message: "Usuario no encontrado." });
	}
}

/**
 * Crear y guarda una transacción.
 * @param {Request} req - Objeto con los datos de la solicitud.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
let create = async (req: Request, res: Response) => {
	try {
		const { type, title, amount, secondPerson} = req.body;
		const newTransaction: TransactionDocument = new TransactionSchema ({
      type,
			title,
			amount,
			secondPerson,
		});
		await transaction.create(newTransaction);
		res.status(201).send({ message: "Succesfull created transaction." });
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}

/**
 * Encuentra todas las transacciones.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
let getAll = async (req: Request, res: Response) => {
	try {
		const transactions = await transaction.getAll();
		res.status(200).send(transactions);
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}

/**
 * Encuentra una transacción por su ID.
 * @param {Request} req - Objeto con los datos de la solicitud, el ID.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
let find = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const transactionFound = await transaction.find(new mongoose.Schema.Types.ObjectId(id));
		res.status(200).send(transactionFound);
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}

/**
 * Elimina una transacción por su ID.
 * @param {Request} req - Objeto con los datos de la solicitud, el ID.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
let deleteOne = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await transaction.deleteOne(new mongoose.Schema.Types.ObjectId(id));
		res.status(200).send({message: "Transaction was deleted successfully!"});
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}

/**
 * Elimina todas las transacciones.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
let deleteAll = async (req: Request, res: Response) => {
	try {
		const count = await transaction.deleteAll();
		res.status(200).send({message: count + " transaction was deleted successfully!"});
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
}

/**
 * Modifica una transacción por su ID.
 * @param {Request} req - Objeto con los datos de la solicitud, el ID.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
let modify = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await transaction.modify(req.body, new mongoose.Schema.Types.ObjectId(id));
		res.status(200).send({message: "User was update successfully!"});
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
	buy,
	addCoins,
};
