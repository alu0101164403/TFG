import axios from 'axios';

export default axios.create({
  //baseURL: 'http://10.0.2.2:8080',
  baseURL: 'https://tfg-backend-ainoa.onrender.com/',
  headers: {
    'Content-type': 'application/json',
  },
});
