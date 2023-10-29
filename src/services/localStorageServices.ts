import { IQueryObject } from '@/types/appTypes';
import { GetDataFromStorageType } from '@/services/localStorageServices.types';

const STORAGE_KEY = 'artworks_key';
const getDataFromStorage: GetDataFromStorageType<unknown> = (fallback) => {
  let out = null;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) out = JSON.parse(data);
  } catch (e) {
    out = fallback ?? null;
  }
  return out;
};

const setDataToLocalStorage = (data: IQueryObject) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    return false;
  }
};

export { getDataFromStorage, setDataToLocalStorage };
