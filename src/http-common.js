import axios from "axios";

export const baseURL="https://test-api.storexweb.com/";
export default axios.create({
  baseURL:baseURL ,
  headers: {
    "Content-type": "multipart/form-data",
    "Accept":"application/json"
  }
});