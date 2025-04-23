import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
  timeout: 10000,
});

// Gets data from server and returns it
export const getTest = async () => {
  try {
    const response = await api.get("test");
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};
