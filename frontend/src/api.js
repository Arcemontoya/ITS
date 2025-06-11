import axios from 'axios';

export const authAxios = axios.create({
  baseURL: 'http://localhost:3000/api',
});

authAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
