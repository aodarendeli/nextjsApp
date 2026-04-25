import axios from 'axios';

const execute = axios.create({
  baseURL: process.env.API_BASE_URL,
});

execute.interceptors.request.use(async (config) => {
  config.headers.Accept = 'application/json';
  return config;
});

export default execute;
