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
  title: string;
  type: string;
  secondPerson: string;
  date: string;
  amount: number;
}

const getTransaction = async (idTransaction: String): Promise<AxiosResponse<any, any>> => {
  const walletData = await http.get('/transaction/id/' + idTransaction);
  return walletData;
};

const buy = async (data: DataTransaction): Promise<AxiosResponse<DataHistory>> => {
  return await http.post('/transaction/transfer', data);
};

const TransactionService = {
  getTransaction,
  buy,
};

export default TransactionService;
