/**
 * authentication service. Contiene las peticiones http que se haran al servidor
 */

import http from '../../http-common';

const register = (data) => {
  return http.post('/user/register', data);
};

const login = async (data) => {
  const dataUser = await http.post('/user/login', data);
  return dataUser.data.data;
};

const AuthService = {
  register,
  login,
};

export default AuthService;
