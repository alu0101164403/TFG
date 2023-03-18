import http from '../../http-common';

const getWallet = async (idWallet: String) => {
  const walletData = await http.get('/wallet/' + idWallet);
  return walletData.data;
};

const WalletService = {
  getWallet,
};

export default WalletService;
