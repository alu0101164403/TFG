/**
 * authentication service. Contiene las peticiones http que se haran al servidor
 */

import http from '../../http-common';

const saveRequest = (data) => {
  return http.post('/request/', data);
};

const getRequest = (data) => {
  return http.get('/request/', data);
};

const AuthService = {
  saveRequest,
  getRequest,
};

export default AuthService;
