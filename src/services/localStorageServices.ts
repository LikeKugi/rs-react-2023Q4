import { queryObject } from '@/types/appTypes';

const STORAGE_KEY = 'app_key';
const getDataFromStorage = () => {
  let out: queryObject = { query: '' };
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) out = JSON.parse(data);
  } catch (e) {
    out = {
      query: '',
    };
  }
  return out;
};

const setDataToLocalStorage = (data: queryObject) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    return false;
  }
};

export { getDataFromStorage, setDataToLocalStorage };
