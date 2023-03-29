import {AxiosResponse} from 'axios';
import {createContext} from 'react';

export const AuthContext = createContext({
  user: null,
  isLoggedIn: false,
  isLoading: false,
  login: (_data: AxiosResponse) => {},
  updateUser: (_data: AxiosResponse) => {},
  logout: () => {},
});
