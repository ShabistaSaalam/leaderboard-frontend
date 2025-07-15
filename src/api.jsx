import axios from "axios";


const API_BASE_URL = "https://leaderboard-backend-eedu.onrender.com/api";

export const fetchLeaderboard = () => axios.get(`${API_BASE_URL}/leaderboard`);

export const claimPoints = (userId) =>
  axios.post(`${API_BASE_URL}/claim`, { userId });

export const addUser = async (name) =>
  axios.post(`${API_BASE_URL}/users`, { name });
