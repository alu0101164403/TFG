/* eslint-disable prettier/prettier */
import {AxiosResponse} from 'axios';
import http from '../../http-common';

const getTransaction = async (idTransaction: String): Promise<AxiosResponse<any, any>> => {
  const walletData = await http.get('/transaction/id/' + idTransaction);
  return walletData.data;
};

const buy = async (data): Promise<AxiosResponse<any, any>> => {
  return await http.post('/transaction/transfer', data);
};

const TransactionService = {
  getTransaction,
  buy,
};

export default TransactionService;
