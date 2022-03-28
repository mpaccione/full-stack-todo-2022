import axios from "axios";
import store from "../redux/store";
import { setErrorMessage } from "../redux/errorSlice";

const api = axios.create({
  baseURL: "http://server:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const del = async (path) => {
  try {
    const response = await api.delete(path);
    return response;
  } catch (error) {
    dispatchError(error);
    throw error;
  }
};

export const get = async (path) => {
  try {
    const response = await api.get(path);
    return response;
  } catch (error) {
    dispatchError(error);
    throw error;
  }
};

export const post = async (path, obj) => {
  try {
    const response = await api.post(path, obj);
    return response;
  } catch (error) {
    dispatchError(error);
    throw error;
  }
};

export const put = async (path, obj) => {
  try {
    const response = await api.put(path, obj);
    return response;
  } catch (error) {
    dispatchError(error);
    throw error;
  }
};

export const dispatchError = (err) => {
  store.dispatch(
    setErrorMessage(err.message !== undefined ? err.message : err.toString())
  );
  setTimeout(() => {
    store.dispatch(setErrorMessage(''));
  }, 5000);
};
