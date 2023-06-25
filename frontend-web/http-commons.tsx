import axios from 'axios';

export default axios.create({
  //baseURL: 'http://127.0.0.1:8080', // direccion de 
  //baseURL: 'https://tfg-beckend.vercel.app/',
  baseURL: 'https://tfg-backend-ainoa.onrender.com',
  headers: {
    'Content-type': 'application/json',
  },
});
