import axios from "axios";

// Use environment variable or fallback to localhost for dev
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const fetchLeaderboard = () => axios.get(`${API_BASE_URL}/leaderboard`);

export const claimPoints = (userId) =>
  axios.post(`${API_BASE_URL}/claim`, { userId });

export const addUser = async (name) =>
  axios.post(`${API_BASE_URL}/users`, { name });
