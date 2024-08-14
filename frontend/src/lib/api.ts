import axios from "axios";

export const api = axios.create({
  baseURL: "https://my-lyrics.learnwithpadas.com",
  withCredentials: true,
});

