import axios from "axios";
import { API } from "./apiUrl";

 export const getService = async (path: string) => {
  const response = await axios.get(API + path);
  return response
};