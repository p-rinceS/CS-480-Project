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


export const getClientCreditCards = async (clientEmail) => {
    try {
        const response = await api.post("get_client_credit_cards", {
            client_email: clientEmail
        });
        return response.data;
    } catch (error) {
        console.log("Error: ", error);
        throw error;
    }
}


// number TEXT NOT NULL,
// client_email TEXT NOT NULL,
// billing_road TEXT NOT NULL,
// billing_number INTEGER NOT NULL,
// billing_city TEXT NOT NULL,
export const addClientCreditCard = async (clientEmail, cardNumber, {
    billingRoad,
    billingNumber,
    billingCity
}) => {
    try {
        const response = await api.post("add_client_credit_card", {
            client_email: clientEmail,
            card_number: cardNumber,
            billing_road: billingRoad,
            billing_number: billingNumber,
            billing_city: billingCity
        });
        console.log("Response: ", response);
        return response.data;
    } catch (error) {
        console.log("Error: ", error);
        throw error;
    }
}

export const deleteClientCreditCard = async (clientEmail, cardNumber, billing_road, billing_number, billing_city) => {
    try {
        const response = await api.post("delete_client_credit_card", {
            client_email: clientEmail,
            card_number: cardNumber,
            billing_road: billing_road,
            billing_number: billing_number,
            billing_city: billing_city
        });
        console.log("Response: ", response);
        return response.data;
    } catch (error) {
        console.log("Error: ", error);
        throw error;
    }
}
