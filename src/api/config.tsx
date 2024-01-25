import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

axios.defaults.withCredentials = true;

export default axios.create({
  baseURL: BASE_URL
})

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'content-type': 'application/json'
  }
});


