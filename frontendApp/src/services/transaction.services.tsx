import http from '../../http-common';

const getTransaction = async (idTransaction: String) => {
  const walletData = await http.get('/transaction/' + idTransaction);
  return walletData.data;
};

const TransactionService = {
  getTransaction,
};

export default TransactionService;
