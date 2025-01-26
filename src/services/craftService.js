import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;
const BASE_URL = `${BACKEND_URL}/crafts`;

const index = async () => {
  try {
    const res = await axios.get(BASE_URL);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const show = async (craftId) => {
  try {
    const res = await axios.get(`${BASE_URL}/${craftId}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const create = async (formData) => {
  try {
    const res = await axios.post(BASE_URL, formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const update = async (formData, craftId) => {
  try {
    const res = await axios.put(`${BASE_URL}/${craftId}`, formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteCraft = async (craftId) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${craftId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export { index, show, create, update, deleteCraft };
