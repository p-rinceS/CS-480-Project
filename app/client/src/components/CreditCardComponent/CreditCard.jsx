import './CreditCard.css';
import {deleteClientCreditCard} from "../../services/apiService.js";
import useGetIdentity from "../../utils/hooks/useGetIdentity.jsx";

const CreditCard = ({ card_number, billing_road, billing_number, billing_city }) => {
    const {identity} = useGetIdentity();

    const handlePaymentDelete = async (cardNumber) => {
        try {
            const data = await deleteClientCreditCard(identity.email, cardNumber, billing_road, billing_number, billing_city);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="credit-card">
            <div className="card-number">... {card_number.slice(-4)}</div>
            {/*<div className="card-email">{card_email}</div>*/}
                <div>{billing_road} {billing_number}, {billing_city}</div>
            <button className={'delete-credit-card-button'} onClick={() => {
                handlePaymentDelete(card_number).then(() =>
                    console.log("Payment method deleted")
                ).catch(e => {
                    console.log(e)
                });
                window.location.reload();
            }}>Delete</button>
        </div>
    );
}

export default CreditCard;