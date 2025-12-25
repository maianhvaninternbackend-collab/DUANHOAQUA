import { axiosUser, axiosAdmin } from "../shared/utils/axios.custiomize";

// ===== USER AUTH =====
export const loginUserApi = (data) =>
  axiosUser.post("/api/v1/auth/login", data);

export const registerUserApi = (data) =>
  axiosUser.post("/api/v1/auth/register", data);

export const logoutUserApi = () =>
  axiosUser.post("/api/v1/auth/logout");

// ===== ADMIN AUTH =====
export const loginAdminApi = (email, password) =>
  axiosAdmin.post("/api/v1/auth/admin/login", {
    email,
    password,
  });

export const registerAdminApi = (fullName, email, password) =>
  axiosAdmin.post("/api/v1/auth/admin/register", {
    fullName,
    email,
    password,});

export const logoutAdminApi = () =>
  axiosAdmin.post("/api/v1/auth/logout");
