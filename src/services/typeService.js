import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;
const BASE_URL = `${BACKEND_URL}/types`;

const index = async () => {
  try {
    const res = await axios.get(BASE_URL);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const show = async (typeId) => {
  try {
    const res = await axios.get(`${BASE_URL}/${typeId}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const create = async (formData) => {
  try {
    const res = await axios.post(BASE_URL, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const update = async (formData, typeId) => {
  try {
    const res = await axios.put(`${BASE_URL}/${typeId}`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteType = async (typeId) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${typeId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export { index, show, create, update, deleteType };
