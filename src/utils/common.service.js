import { toast } from "react-toastify";
import CryptoJS from 'crypto-js';
import Cookies from "js-cookie";

const CRYPTO_KEY = 'VLaEQrkAjtcyayabGsadsAbFdBMiMZmV'
const CRYPTO_IV = 'VLaEQrkAjtcyayab'

const KEY = CryptoJS.enc.Utf8.parse(CRYPTO_KEY);
const IV = CryptoJS.enc.Utf8.parse(CRYPTO_IV);

const TOAST_SUCCESS = (message) => {
  return toast.success(message);
};

const TOAST_INFO = (message) => {
  return toast.info(message);
};

const TOAST_ERROR = (message) => {
  return toast.error(message);
};

const TOAST_WARNING = (message) => {
  return toast.warning(message);
};

export const Encryption = (request = {}, isStringify) => {
  const requestData = isStringify ? JSON.stringify(request) : request;
  let encrypted = CryptoJS.AES.encrypt(requestData, KEY, { iv: IV }).toString();
  return encrypted
}

export const Decryption = async (response) => {
  let decrypted = await CryptoJS.AES.decrypt(response.toString(), KEY, { iv: IV });
  let decryptedData = await JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  return decryptedData;
}

export const PUBLICURL = process.env.PUBLIC_URL

export const logoutRedirection = () => {
  Cookies.remove('isLoginCA');
  Cookies.remove('dataCA');
  Cookies.remove('tokenCA');
}


export {
  TOAST_SUCCESS,
  TOAST_INFO,
  TOAST_ERROR,
  TOAST_WARNING
};


