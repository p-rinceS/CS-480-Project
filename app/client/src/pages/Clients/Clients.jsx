import './Clients.css';
import {getClients} from "../../services/apiService.js";
import ClientCard from "../../components/ClientCard/ClientCard.jsx";
import {useEffect, useState} from "react";



const Clients = () => {

    const [clients, setClients] = useState([]);
    const getClientsAPI = async () => {
        try {
            const data = await getClients();
            setClients(data);
            console.log("Clients: ", data);
        } catch (error) {
            console.log(error);
        }
    };
    // call on page load
    useEffect(() => {
        getClientsAPI().then(r =>
            console.log("Clients fetched")
        ).catch(e => console.log(e));
    }, []);



    return (
        <>
            {clients.map((client) => (
                <ClientCard key={client.id} client={client} />
            ))}

        </>

    );
}


export default Clients;


