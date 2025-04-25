import './PaymentInfo.css';
import {addClientCreditCard, deleteClientCreditCard, getClientCreditCards} from "../../../../services/apiService.js";
import useGetIdentity from "../../../../utils/hooks/useGetIdentity.jsx";
import {useEffect, useState} from "react";
import CreditCard from "../../../../components/CreditCardComponent/CreditCard.jsx";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner.jsx";


const PaymentInfo = () => {

    const [creditCards, setCreditCards] = useState([]);
    const {identity} = useGetIdentity();
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState('paymentInfo');

    const getPaymentInfoAPI = async () => {
        try {
            const data = await getClientCreditCards(identity.email);
            setCreditCards(data.credit_card);
        } catch (error) {
            console.log(error);
        }
    }

    const handleNewPaymentSubmission = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const cardNumber = formData.get('cardNumber');
        const billingRoad = formData.get('billingRoad');
        const billingNumber = formData.get('billingNumber');
        const billingCity = formData.get('billingCity');

        const data = await addClientCreditCard(identity.email, cardNumber, {
            billingRoad,
            billingNumber,
            billingCity
        });
        console.log(data);
    }

    useEffect(() => {
        getPaymentInfoAPI().then(r => {
                console.log("Payment Info fetched");
                setLoading(false);
            }
        ).catch(e => {
            console.log(e)
        });
    }, []);

    return (
        <>
            {view === 'paymentInfo' && (
                <div className={'payment-info-container'}>
                    <div className={'loading-spinner-container'}><LoadingSpinner loading={loading}></LoadingSpinner>
                    </div>
                    {!loading && (
                        <>
                            <h2>Payment Info</h2>
                            <button className={'add-new-payment-method-button'}
                            onClick={() => {setView('addNewPaymentMethod')}}>
                            Add New Payment Method +</button>
                            <div className={'payment-cards'}>
                                {
                                    creditCards.map((card) => (
                                        <div key={card.number} className={'credit-card-container'}>
                                            <CreditCard card_email={card.client_email} billing_city={card.billing_city}
                                                        billing_number={card.billing_number}
                                                        billing_road={card.billing_road}
                                                        card_number={card.number}>
                                            </CreditCard>
                                        </div>
                                        )
                                    )
                                }
                            </div>
                        </>
                    )}
                </div>
            )}
            {
                view === 'addNewPaymentMethod' && (
                    <div className={'add-new-payment-method-container'}>
                        <h2>Add New Payment Method</h2>
                        <button className={'back-to-payment-info-button'}
                                onClick={() => {
                                    setView('paymentInfo')
                                }}>
                            Back to Payment Info
                        </button>
                        <div className={'add-new-payment-method-text'}>
                            <form className={'add-payment-method-form'} onSubmit={(event) => {
                                handleNewPaymentSubmission(event).then(() => {
                                    console.log("Payment Method added");
                                    window.location.reload();
                                });
                            }}>
                                <div>
                                    <label htmlFor="cardNumber" className={'card-number-label'}>Card Number:</label>
                                    <input
                                        type="text"
                                        id="cardNumber"
                                        name="cardNumber"
                                        required
                                        pattern="\d{16}"
                                        maxLength="16"
                                        title="Card number must be 16 digits long"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="billingRoad" className={'billing-road-label'}>Billing Road:</label>
                                    <input type="text" id="billingRoad" name="billingRoad" required/>
                                </div>
                                <div>
                                    <label htmlFor="billingNumber" className={'billing-number-label'}>Billing
                                        Number:</label>
                                    <input type="number" id="billingNumber" name="billingNumber" required/>
                                </div>
                                <div>
                                    <label htmlFor="billingCity" className={'billing-city-label'}>Billing City:</label>
                                    <input type="text" id="billingCity" name="billingCity" required/>
                                </div>
                                <button type="submit" className={'submit-credit-card-button'}>Submit</button>
                            </form>
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default PaymentInfo;