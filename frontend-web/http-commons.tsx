import axios from 'axios';

export default axios.create({
  baseURL: 'http://127.0.0.1:8080', // direccion de 
  headers: {
    'Content-type': 'application/json',
  },
});