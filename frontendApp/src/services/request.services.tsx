/**
 * authentication service. Contiene las peticiones http que se haran al servidor
 */

import http from '../../http-common';

const saveRequest = (data) => {
  return http.post('/request/', data);
};

const getRequest = async (data) => {
  const datareq = await http.get('/request/', data);
  return datareq.data.data;
};

const AuthService = {
  saveRequest,
  getRequest,
};

export default AuthService;
