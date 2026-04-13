import axios from "axios";

export default axios.create({
  baseURL: "",
});


export const apiClient = axios.create({
  baseURL: 'https://api.rawg.io',
  params: {
    key: process.env.RAWG_API_KEY,
  },
  headers: {
    'User-Agent': 'MyVideoGameApp'
  }
});
