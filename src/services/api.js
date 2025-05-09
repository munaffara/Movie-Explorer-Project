// src/services/api.js
import axios from 'axios';
import { API_BASE_URL, API_KEY, API_DEFAULT_PARAMS } from '../config/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  params: {
    api_key: API_KEY,
    ...API_DEFAULT_PARAMS,
  },
});

export default api;