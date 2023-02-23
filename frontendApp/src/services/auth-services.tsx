/**
 * authentication service. Contiene las peticiones http que se haran al servidor
 */

import http from '../../http-common';

class Authentication {
  register(data) {
    return http.post('/user/register', data);
  }
  login(data) {
    return http.post('/user/login', data);
  }
}

export default new Authentication();
