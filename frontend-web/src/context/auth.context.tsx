import {AxiosResponse} from 'axios';
import {createContext} from 'react';


interface User {
  id: string;
  isLoggedIn: boolean;
  isLoading: boolean;
}

interface AuthContextValue {
  user: User | null;
  isLoggedIn: false;
  isLoading: false;
  login: (_data: AxiosResponse) => void;
  updateUser: (_data: AxiosResponse) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoggedIn: false,
  isLoading: false,
  login: (_data: AxiosResponse) => {},
  updateUser: (_data: AxiosResponse) => {},
  logout: () => {},
});