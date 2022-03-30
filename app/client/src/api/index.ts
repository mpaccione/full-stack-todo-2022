import axios, { AxiosError } from "axios";
import store from "../redux/store";
import { setErrorMessage } from "../redux/errorSlice";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const del = async (path: string) => {
  try {
    const response = await api.delete(path);
    return response;
  } catch (error: unknown) {
    dispatchError(error);
    throw error;
  }
};

export const get = async (path: string) => {
  try {
    const response = await api.get(path);
    return response;
  } catch (error: unknown) {
    dispatchError(error);
    throw error;
  }
};

export const post = async (path: string, obj: object) => {
  try {
    const response = await api.post(path, obj);
    return response;
  } catch (error: unknown) {
    dispatchError(error);
    throw error;
  }
};

export const put = async (path: string, obj: object) => {
  try {
    const response = await api.put(path, obj);
    return response;
  } catch (error: unknown) {
    dispatchError(error);
    throw error;
  }
};

export const dispatchError = (err: any) => {
  store.dispatch(
    setErrorMessage(err.message !== undefined ? err.message : err.toString())
  );
  setTimeout(() => {
    store.dispatch(setErrorMessage(''));
  }, 5000);
};
