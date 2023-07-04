/* eslint-disable prettier/prettier */
import {AxiosResponse} from 'axios';
import http from '../../http-common';
import { User } from '../context/auth.context';

export interface DataTransaction {
  buyer: User | null,
  sellerId: string,
  requestId: string,
}

export interface DataHistory {
  _id: string,
  title: string;
  type: string;
  secondPerson: string;
  date: string;
  amount: number;
}

export interface AddCoins {
  amount: number;
}

const getTransaction = async (idTransaction: String): Promise<AxiosResponse<any, any>> => {
  return await http.get('/api/transaction/id/' + idTransaction);
};

const buy = async (data: DataTransaction): Promise<AxiosResponse<DataHistory>> => {
  return await http.post('/api/transaction/transfer', data);
};

const addCoins = async (data: AddCoins, userId: string): Promise<AxiosResponse<DataHistory>> => {
  return await http.post('/api/transaction/id/' + userId, data);
};

const TransactionService = {
  getTransaction,
  buy,
  addCoins,
};

export default TransactionService;
