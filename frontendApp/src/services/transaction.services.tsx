/* eslint-disable prettier/prettier */
/**
 * @file transaction.services.tsx
 * @brief Transaction service module. Contiene las funciones para realizar solicitudes al servidor.
 */
import {AxiosResponse} from 'axios';
import http from '../../http-common';
import { User } from '../context/auth.context';
/**
 * Interfaz para los datos de una transaccion.
*/
export interface DataTransaction {
  buyer: User | null,
  sellerId: string,
  requestId: string,
}
/**
 * Interfaz para los datos del hostorial de transacciones.
*/
export interface DataHistory {
  _id: string,
  title: string;
  type: string;
  secondPerson: string;
  date: string;
  amount: number;
}
/**
 * Interfaz para los datos de una compra de monedas.
*/
export interface AddCoins {
  amount: number;
}
/**
 * Petición al servidor para obtener una transaccion.
 * @param data El Id de la transaacion a buscar.
 * @returns Una promesa que se resuelve con la respuesta del servidor.
*/
const getTransaction = async (idTransaction: String): Promise<AxiosResponse<any, any>> => {
  return await http.get('/api/transaction/id/' + idTransaction);
};
/**
 * Petición al servidor para realizar la transaccion entre dos usuarios de monedas (compra/venta).
 * @param data Los datos para la transaccion.
 * @returns Una promesa que se resuelve con la respuesta del servidor.
*/
const buy = async (data: DataTransaction): Promise<AxiosResponse<DataHistory>> => {
  return await http.post('/api/transaction/transfer', data);
};
/**
 * Petición al servidor para añadir monedas al monedero de un usuario.
 * @param data Numero de monedas y Id del usuario.
 * @returns Una promesa que se resuelve con la respuesta del servidor.
*/
const addCoins = async (data: AddCoins, userId: string): Promise<AxiosResponse<DataHistory>> => {
  return await http.post('/api/transaction/id/' + userId, data);
};

const TransactionService = {
  getTransaction,
  buy,
  addCoins,
};

export default TransactionService;
