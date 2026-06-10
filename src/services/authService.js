import axios from "axios";

const API = "http://localhost:5000/api/auth";


// REGISTER
export const registerUser = async (data) => {
  const response = await axios.post(
    `${API}/register`,
    data
  );

  return response.data;
};


// LOGIN
export const loginUser = async (data) => {
  const response = await axios.post(
    `${API}/login`,
    data
  );

  return response.data;
};