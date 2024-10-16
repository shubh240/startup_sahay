import axios from "axios";
import { DELETE, GET, PATCH, POST, PUT, API_KEY, USER, OPTION } from "../app.config";
import Cookies from "js-cookie";
import { Decryption, Encryption, TOAST_ERROR, logoutRedirection } from "./common.service";
import { Navigate } from "react-router-dom";

/**
 * [request description]
 * @param  {[string]} url       URL of the API which needs to be consumed by client
 * @param  {[string]} method    Method type of the API call currently GET,POST,PUT,DELETE is supported in order suport to more methods add method name to the array -> allowedMethodTypes
 * @param  {[JSON]} payload     Payload to be provided to server for sending data
 * @param  {[string]} headers   Request Headers required by the server side to process the API call
 * @return {[JSON]}             Response provided by the server side code
 */

const request = async (url, method, token, payload) => {
  try {
    const allowedMethodTypes = [GET, POST, PUT, PATCH, DELETE, OPTION];

    if (allowedMethodTypes.indexOf(method.toLowerCase()) < 0) {              //is less than 0, which indicates that the method is not found in the Array.
      throw new Error(`Invalid method type please provide one of these methods... \n ${allowedMethodTypes}`);
    }
    const headers = {
      "api-key": API_KEY,
      'Content-Type': 'text/plain',
      'Accept-language': Cookies.get('languageCW') || 'en',
      ...(token && { token: Cookies.get('token') }),
    };
    
    // const result = await axios({ url, method, data: payload, headers });
    const result = await axios({ url, method, data: Encryption(payload, true), headers });
    
    let decodeData = await Decryption(result?.data);
    
    if (decodeData?.code === '0') {
      TOAST_ERROR(decodeData?.message)
    }
    
    return decodeData;
  } catch (error) {
    console.log(error,"axios errrrr");
    
    let decodeData = await Decryption(error?.response?.data);
    if (decodeData?.code == -1) {
      await logoutRedirection();
      <Navigate to="/" replace={true} />
    } else {
      throw new Error(error);
    }
  }

};

export default request;
