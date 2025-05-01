import axios from "axios";
import { data } from "react-router-dom";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
  timeout: 10000,
});

export const addManager = async (name, email, ssn) => {
  try {
    const response = await api.post("managers", {
      name: name,
      email: email,
      ssn: ssn,
    });
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};

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

export const addClient = async (name, email, homeRoad, homeNumber, homeCity) => {
  try {
    const response = await api.post("clients", {
      name: name,
      email: email,
      homeRoad: homeRoad,
      homeNumber: homeNumber,
      homeCity: homeCity,
    });
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
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


export const getAllDriversThatRented = async (client_email) => {
    try {
        const response = await api.post("drivers_that_were_rented", {
            client_email: client_email
        });
        return response.data;
    } catch (error) {
        console.log("Error: ", error);
        throw error;
    }
}

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

export const getDriverReviews = async (driver_email) => {
    //placeholder
}

export const getReviewableDrivers = async (client_email) => {
    try {
        const response = await api.post("get_reviewable_drivers", {
            client_email: client_email,
        });
        console.log("Response: ", response);
        return response.data;
    } catch (error) {
        console.log("Error: ", error);
        throw error;
    }
}

export const writeReview = async (client_email, driver, rating, message) => {
    try {
        const response = await api.post("write_review", {
            client_email: client_email,
            driver: driver,
            rating: rating,
            message: message,
        });
        console.log("Response: ", response);
        window.location.reload()
        return response.data;
    } catch (error) {
        console.log("Error: ", error);
        throw error;
    }
}

export const getDriverAddress = async (driverName) => {
  try {
    const response = await api.get(`/driver/address/${driverName}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching driver address: ", error);
    return null;
  }
};

export const updateDriverAddress = async (driverName, road, number, city) => {
  try {
    const response = await api.put("driver/address", {
      driverName,
      road,
      number,
      city,
    });
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getAssignedModels = async (driverName) => {
  try {
    const response = await api.get(`/driver/models/assigned/${driverName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching assigned models:', error);
    return [];
  }
};

export const getAvailableModels = async (driverName) => {
  try {
    const response = await api.get(`/driver/models/available/${driverName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching available models:', error);
    return [];
  }
};

export const assignDriverModel = async (driverName, modelId, carId) => {
  try {
    await api.post(`/driver/models/assign`, {
      driver_name: driverName,
      model_id: modelId,
      car_id: carId
    });
  } catch (error) {
    console.error('Error assigning model to driver:', error);
  }
};