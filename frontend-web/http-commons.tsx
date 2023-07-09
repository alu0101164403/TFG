import axios from 'axios';

const apiUrl = process.env.API_URL;

export default axios.create({
  //baseURL: 'http://127.0.0.1:8080',
  //baseURL: 'https://tfg-production-0e48.up.railway.app',
  baseURL: 'https://tfg-backend-ainoa.onrender.com/',
  headers: {
    'Content-type': 'application/json',
  },
});
