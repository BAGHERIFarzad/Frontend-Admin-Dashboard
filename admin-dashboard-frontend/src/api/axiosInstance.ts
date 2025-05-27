import axios from 'axios';

type CustomAxiosRequestConfig = Parameters<typeof axios.interceptors.request.use>[0] extends (config: infer T) => any ? T : never;

const api = axios.create({
  baseURL: 'http://localhost:5051/api',
});

const token = localStorage.getItem('token');
console.log("Sending token to backend:", token);


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default api;
