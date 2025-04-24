import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
  timeout: 10000,
});

// Gets data from server and returns it
// export const getTest = async () => {
//   try {
//     const response = await api.get("test");
//     return response.data;
//   } catch (error) {
//     console.log("Error: ", error);
//     throw error;
//   }
// };

export const getClients = async () => {
    try {
        const response = await api.get("test/get_clients");
        console.log("Response: ", response);
        return response.data;
    } catch (error) {
        console.log("Error: ", error);
        throw error;
    }
}

export const checkUserExists = async (role, identifier) => {
    try {
        const response = await api.post("check_user", {
            role,
            identifier
        });
        console.log("Response: ", response);
        return response.data;
    } catch (error) {
        console.log("Error: ", error);
        throw error;
    }
}
