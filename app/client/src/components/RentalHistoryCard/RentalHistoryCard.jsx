import './RentalHistoryCard.css';

const RentalHistoryCard = ({ car, carModel, carYear, carColor, carTransmission, date, carDriver, rent_id}) => {
    return (
        <div className={'rental-history-card'}>
            <div className={'car-details'}>
                <h3>Car Details</h3>
                <p><span>Car:</span> {car}</p>
                <p><span>Model:</span> {carModel}</p>
                <p><span>Year:</span> {carYear}</p>
                <p><span>Color:</span> {carColor}</p>
                <p><span>Transmission:</span> {carTransmission}</p>
            </div>
            <div className={'rental-details'}>
                <h3>Rental Details</h3>
                <p><span>Date:</span> {new Date(date).toLocaleString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true
                })}</p>
                <p><span>Driver:</span> {carDriver}</p>
            </div>
        </div>
    );
}

export default RentalHistoryCard;