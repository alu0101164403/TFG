/**
 * authentication service. Contiene las peticiones http que se haran al servidor
 */

import {AxiosResponse} from 'axios';
import http from '../../http-common';

const register = (data: string): Promise<AxiosResponse<any, any>> => {
  return http.post('/user/register', data);
};

const login = async (data: {
  username: string;
  password: string;
}): Promise<AxiosResponse<any, any>> => {
  const dataUser = await http.post('/user/login', data);
  return dataUser.data.data;
};

const AuthService = {
  register,
  login,
};

export default AuthService;
