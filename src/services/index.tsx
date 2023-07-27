import axios from "axios";

const URL = "http://localhost:5000/";

const instance = axios.create({
  baseURL: "http://localhost:5000/",
});

const getAllTypeFood = async () => {
  return await axios
    .get(`${URL}food/option/type`)
    .then((res) => res.data)
    .catch((err) => err);
};

// const getFoodByType = async (query: { type: any }) => {
//   return await axios
//     .get(`${URL}/cookies`)
//     .then((res) => res.data)
//     .catch((err) => err);
// };

const getFoodByType = async (query: { type: any }) => {
  return await axios
    .get(`${URL}food/?type=${query.type}`)
    .then((res) => res.data)
    .catch((err) => err);
};

const getFoodById = async (id: string) => await instance.get(`food/${id}`);

//Table
const getStage = async () => await axios.get(`${URL}table/option/stage`);

const getTableByStage = async (params: {}) =>
  await instance.get("table/", { params: params });

const searchTable = async (params: {}) =>
  await instance.get("table/search/", { params: params });

const getTableById = async (id: string) =>
  await instance.get(`table/find/${id}`);

//TableImage

const getOptions = async () => await axios.get(`${URL}table-image/options`);

const getTableImage = async (params: string) =>
  await axios.get(`${URL}table-image/?id_table=${params}`);

const getTableByFilter = async (params: string[]) =>
  await instance.get("table-image/filter/", { params: { options: params } });

// Client
const login = async (data: {}) =>
  await instance.post("client/login", { ...data });

const register = async (data: {}) => await instance.post("/client/", data);

const getClient = async (data: string) => await instance.get(`client/${data}`);

const updateClient = async (data: any) => await instance.put("client/", data);

// Bill
const getBillByIdClient = async (_id: string) =>
  await instance.get(`bill/client/${_id}`);

// Booking
const createBooking = async (data: {}) => await instance.post("booking", data);

const getBookingByIdClient = async (_id: string) =>
  await instance.get(`booking/client/${_id}`);

const getTableOptionsOnly = async () =>
  await instance.get(`table-image/options`);

export default {
  getAllTypeFood,
  getFoodByType,
  getStage,
  getTableByStage,
  getOptions,
  getTableImage,
  getTableByFilter,
  login,
  register,
  getClient,
  getBillByIdClient,
  createBooking,
  searchTable,
  getTableOptionsOnly,
  getFoodById,
  getBookingByIdClient,
  updateClient,
  getTableById,
};
