import axios from "axios";
import { data } from "react-router-dom";

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

export const getModels = async () => {
  try {
    const response = await api.get("models");
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const addModel = async (transmission, color, year, carId) => {
  try {
    const response = await api.post("models", {
      transmission: transmission,
      color: color,
      year: year,
      carId: carId,
    });
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const deleteModel = async (modelId) => {
  try {
    const response = await api.delete("models", {
      data: {
        modelId: modelId,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getCars = async () => {
  try {
    const response = await api.get("cars");
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const addCar = async (brand) => {
  try {
    const response = await api.post("cars", { brand: brand });
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const deleteCar = async (carId) => {
  try {
    const response = await api.delete("cars", { data: { carId: carId } });
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getDrivers = async () => {
  try {
    const response = await api.get("drivers");
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const addDriver = async (name, homeRoad, homeNumber, homeCity) => {
  console.log("Adding Driver " + name);
  try {
    const response = await api.post("drivers", {
      name: name,
      homeRoad: homeRoad,
      homeNumber: homeNumber,
      homeCity: homeCity,
    });
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const deleteDriver = async (name) => {
  try {
    const response = await api.delete("drivers", { data: { name: name } });
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getKClients = async (k) => {
  try {
    const response = await api.get("clients", { params: { k: k } });
    console.log("Response: ", response);
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getCityClients = async (city1, city2) => {
  try {
    const response = await api.get("clients", {
      params: { city1: city1, city2: city2 },
    });
    console.log("Response: ", response);
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getRents = async () => {
  try {
    const response = await api.get("rents");
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getClients = async () => {
  try {
    const response = await api.get("test/get_clients");
    console.log("Response: ", response);
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};

export const checkUserExists = async (role, identifier) => {
  try {
    const response = await api.post("check_user", {
      role,
      identifier,
    });
    console.log("Response: ", response);
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};

export const getClientCreditCards = async (clientEmail) => {
  try {
    const response = await api.post("get_client_credit_cards", {
      client_email: clientEmail,
    });
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};

// number TEXT NOT NULL,
// client_email TEXT NOT NULL,
// billing_road TEXT NOT NULL,
// billing_number INTEGER NOT NULL,
// billing_city TEXT NOT NULL,
export const addClientCreditCard = async (
  clientEmail,
  cardNumber,
  { billingRoad, billingNumber, billingCity }
) => {
  try {
    const response = await api.post("add_client_credit_card", {
      client_email: clientEmail,
      card_number: cardNumber,
      billing_road: billingRoad,
      billing_number: billingNumber,
      billing_city: billingCity,
    });
    console.log("Response: ", response);
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};

export const deleteClientCreditCard = async (
  clientEmail,
  cardNumber,
  billing_road,
  billing_number,
  billing_city
) => {
  try {
    const response = await api.post("delete_client_credit_card", {
      client_email: clientEmail,
      card_number: cardNumber,
      billing_road: billing_road,
      billing_number: billing_number,
      billing_city: billing_city,
    });
    console.log("Response: ", response);
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};
