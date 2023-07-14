/**
 * @file auth.context.tsx
 * @brief Context. Se encarga de compartir datos entre los componentes.
 */
import {AxiosResponse} from 'axios';
import {createContext} from 'react';

/**
 * Interfaz que representa la billetera de un usuario.
 */
export interface Wallet {
  _id: string;
  coins: number;
  history: string[];
}
/**
 * Interfaz que representa a un usuario.
 */
export interface User {
  username: string;
  id: string;
  email: string;
  wallet: Wallet;
}
/**
 * Valores del contexto de autenticación.
 */
interface AuthContextValue {
  user: User | null;
  isLoggedIn: boolean;
  //isLoading: boolean;
  login: (_data: AxiosResponse) => void;
  updateUser: (_data: AxiosResponse) => void;
  updateWallet: (newWallet: AxiosResponse) => void;
  logout: () => void;
}
/**
 * Contexto de autenticación.
 */
export const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoggedIn: false,
  //isLoading: false,
  login: (_data: AxiosResponse) => {},
  updateUser: (_data: AxiosResponse) => {},
  updateWallet: (_newWallet: AxiosResponse) => {},
  logout: () => {},
});
