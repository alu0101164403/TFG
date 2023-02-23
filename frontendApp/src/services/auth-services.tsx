/**
 * authentication service. Contiene las peticiones http que se haran al servidor
 */

import http from '../../http-common';

class Authentication {
  getUser() {
    return http.get('/user/pepe');
  }
}

export default new Authentication();
