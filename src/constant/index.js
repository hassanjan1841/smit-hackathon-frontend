import { get } from "react-hook-form";

const prodUrl = import.meta.env.VITE_PROD_URL;
const devUrl = import.meta.env.VITE_DEV_URL;
const apiUrl = import.meta.env.VITE_API_URL;
const BASE_URL = apiUrl;

export const appRoutes = {
  login: BASE_URL + "auth/login",
  register: BASE_URL + "auth/register",
  getUsers: BASE_URL + "user",
  getCurrentUser: BASE_URL + "user/me",
  createUser: BASE_URL + "user",
  updateUser: BASE_URL + "user",
  deleteUser: BASE_URL + "user",
  sendEmail: BASE_URL + "sendEmail",
  getCategories: BASE_URL + "category",
  getSubCategories: BASE_URL + "subcategory",
  getLoans: BASE_URL + "loan",
  requestLoan: BASE_URL + "loan",
  updateLoan: BASE_URL + "loan",
  changePassword: BASE_URL + "auth/changePassword",
};
