import axios from 'axios';

const API = axios.create({
  baseURL: '/api', // Automatic same-origin routing
  withCredentials: true
});

export default API;