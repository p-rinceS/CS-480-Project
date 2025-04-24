import './Clients.css';
import {getClients} from "../../services/apiService.js";
import ClientCard from "../../components/ClientCard/ClientCard.jsx";
import {useEffect, useState} from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.jsx";



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
    const [loading, setLoading] = useState(true);
    // call on page load
    useEffect(() => {
        getClientsAPI().then(r => {
                setLoading(false);
                console.log("Clients fetched")
            }
        ).catch(e => console.log(e));
    }, []);



    return (
        <div className={"clients-container"}>
            <LoadingSpinner loading={loading}></LoadingSpinner>
            {clients.map((client) => (
                <ClientCard key={client.id} client={client}/>
            ))}
        </div>
    );
}


export default Clients;


