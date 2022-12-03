import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();
const apiUrl = serverRuntimeConfig.apiUrl || publicRuntimeConfig.apiUrl;

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',

  },

});

export default api;