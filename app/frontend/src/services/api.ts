import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();
const apiUrl = serverRuntimeConfig.apiUrl || publicRuntimeConfig.apiUrl;

const api = axios.create({
  baseURL: apiUrl,
});

export default api;