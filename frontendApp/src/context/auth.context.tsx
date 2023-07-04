import {AxiosResponse} from 'axios';
import {createContext} from 'react';

export interface Wallet {
  _id: string;
  coins: number;
  history: string[];
}

export interface User {
  username: string;
  id: string;
  email: string;
  wallet: Wallet;
}

interface AuthContextValue {
  user: User | null;
  isLoggedIn: boolean;
  //isLoading: boolean;
  login: (_data: AxiosResponse) => void;
  updateUser: (_data: AxiosResponse) => void;
  updateWallet: (newWallet: AxiosResponse) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoggedIn: false,
  //isLoading: false,
  login: (_data: AxiosResponse) => {},
  updateUser: (_data: AxiosResponse) => {},
  updateWallet: (_newWallet: AxiosResponse) => {},
  logout: () => {},
});
