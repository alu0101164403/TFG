import {AxiosResponse} from 'axios';
import http from '../../http-commons';
import { User } from '@/context/auth.context';

export interface DataTransaction {
  buyer: User | null,
  sellerId: string,
  requestId: string,
}

const getTransaction = async (idTransaction: String): Promise<AxiosResponse<any, any>> => {
  const walletData = await http.get('/api/transaction/id/' + idTransaction);
  return walletData.data;
};

const buy = async (data: DataTransaction): Promise<AxiosResponse<any, any>> => {
  return await http.post('/api/transaction/transfer', data);
};

const TransactionService = {
  getTransaction,
  buy,
};

export default TransactionService;