import {createContext} from 'react';

export const AuthContext = createContext({
  user: null,
  wallet: null,
  isLoggedIn: false,
  isLoading: false,
  login: (_data: String) => {},
  logout: () => {},
  loadWallet: (_data: String) => {},
});
