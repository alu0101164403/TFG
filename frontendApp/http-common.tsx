import axios from 'axios';

export default axios.create({
  //baseURL: 'http://10.0.2.2:8080',
  //baseURL: 'https://tfg-backend-ainoa.onrender.com/',
  baseURL: 'https://tfg-production-e2d4.up.railway.app/',
  headers: {
    'Content-type': 'application/json',
  },
});
