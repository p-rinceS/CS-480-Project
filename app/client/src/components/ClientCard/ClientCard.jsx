import './ClientCard.css';



const ClientCard = ({ client }) => {
    return (
        <div className="client-card">
            <div className="client-card-header">
                <h5>{client[0]}</h5>
            </div>
            <div className="client-card-body">
                <p>{client[1]}</p>
            </div>
        </div>
    );
}

export default ClientCard;