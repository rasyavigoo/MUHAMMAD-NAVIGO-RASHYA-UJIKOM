import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to add the auth token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Auth Endpoints
export const authService = {
  login: (data) => api.post("/auth/login", data),
  register: (data) => api.post("/auth/register", data),
  getProfile: () => api.get("/auth/profile"),
};

// User Endpoints
export const userService = {
  getAll: () => api.get("/users"),
  getById: (id) => api.get(`/users/${id}`),
  create: (data) => api.post("/users", data),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
};

// Room Endpoints
export const roomService = {
  getAll: () => api.get("/rooms"),
  getById: (id) => api.get(`/rooms/${id}`),
  create: (data) => api.post("/rooms", data),
  update: (id, data) => api.put(`/rooms/${id}`, data),
  delete: (id) => api.delete(`/rooms/${id}`),
};

// Booking Endpoints
export const bookingService = {
  getAll: () => api.get("/bookings"),
  // create: { room_id, room_count, check_in_date, check_out_date, notes }
  create: (data) => api.post("/bookings", data),
  approve: (id) => api.post(`/bookings/${id}/approve`),
  reject: (id, data) => api.post(`/bookings/${id}/reject`, data),
  checkIn: (id) => api.post(`/bookings/${id}/check-in`),
  checkOut: (id) => api.post(`/bookings/${id}/check-out`),
};

export default api;
