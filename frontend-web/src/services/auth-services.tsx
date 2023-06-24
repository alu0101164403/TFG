import {AxiosResponse} from 'axios';
import http from '../../http-commons';

const register = (data: string): Promise<AxiosResponse<any, any>> => {
  return http.post('/user/register', data);
};

const login = async (data: {
  username: string;
  password: string;
}): Promise<AxiosResponse<string, string>> => {
  const dataUser = await http.post('/user/login', data);
  return dataUser.data.data;
};

const AuthService = {
  register,
  login,
};

export default AuthService;