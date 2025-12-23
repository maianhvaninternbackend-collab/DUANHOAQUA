import { axiosAdmin } from "../shared/utils/axios.custiomize";

// ===== ADMIN MANAGEMENT =====
export const getAdminsApi = (params) =>
  axiosAdmin.get("/api/v1/admins", { params });

export const getAdminDetailApi = (id) =>
  axiosAdmin.get(`/api/v1/admins/${id}`);

export const changeAdminStatusApi = (id, isActive) =>
  axiosAdmin.patch(`/api/v1/admins/${id}/status`, { isActive });

export const deleteAdminApi = (id) =>
  axiosAdmin.delete(`/api/v1/admins/${id}`);

// ===== SELF =====
export const updateAdminProfileApi = (data) =>
  axiosAdmin.put("/api/v1/admins/me/profile", data);

export const changeAdminPasswordApi = (data) =>
  axiosAdmin.put("/api/v1/admins/me/change-password", data);
