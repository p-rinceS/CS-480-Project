import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
  timeout: 10000,
});

export const getModels = async () => {
  try {
    const response = await api.get("models");
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

export const getAvailableCars = async (
    date
) => {
    try {
        const response = await api.post("get_available_cars", {
            date: date,
        });
        console.log("Response: ", response);
        return response.data;
    } catch (error) {
        console.log("Error: ", error);
        throw error;
    }

}

export const bookRent = async (
    car_id,
    model_id,
    client_email,
    date
) => {
    try {
        const response = await api.post("book_rent", {
            car_id: car_id,
            model_id: model_id,
            client_email: client_email,
            date: date,
        });
        console.log("Response: ", response);
        return response.data;
    } catch (error) {
        console.log("Error: ", error);
        throw error;
    }
}

export const getRentalHistory = async (client_email) => {
    try {
        const response = await api.post("get_rental_history", {
            client_email: client_email,
        });
        console.log("Response: ", response);
        return response.data;
    } catch (error) {
        console.log("Error: ", error);
        throw error;
    }
}

export const addDriverModel = async (driverName, model_id, car_id) => {
  try {
    const response = await api.post("driver/models", {
      driver_name: driverName,
      model_id,
      car_id,
    });
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};