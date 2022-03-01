import axios from "axios";
import { API } from "./apiUrl";

export const postService = async (path: string, body: any) => {
   return await axios.post(API + path, body).catch(function (error) {
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        return error.request;
      } else {
        return error.message;
      }
    });
  };