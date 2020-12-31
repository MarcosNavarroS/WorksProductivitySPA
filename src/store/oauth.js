import axios from "axios";

const api = axios.create({
    headers: {
      'Content-Type': 'application/json'
    },
    baseURL: `${process.env.REACT_APP_API}`
  });

export default api;
