/**
 * authentication service. Contiene las peticiones http que se haran al servidor
 */

import {AxiosResponse} from 'axios';
import http from '../../http-common';

export interface UserData {
  username: string;
  email: string;
  credential: string;
  password: string;
}

const register = (data: UserData): Promise<AxiosResponse<any, any>> => {
  return http.post('/api/user/register', data);
};

const login = async (data: {
  username: string;
  password: string;
}): Promise<AxiosResponse<string, string>> => {
  const dataUser = await http.post('/api/user/login', data);
  return dataUser.data;
};

export const Auth = {
  register,
  login,
};
