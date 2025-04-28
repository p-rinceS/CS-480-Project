import './CarCard.css';

const CarCard = ({
    car,
    carModel,
    carYear,
    carColor,
    carTransmission,
                 }) => {
    return (
        <div className={'car-card-container'}>
                <div>{car}</div>
                <div>{carModel}</div>
                <div>{carYear}</div>
                <div>{carColor}</div>
                <div>{carTransmission}</div>
        </div>
    );
}

export default CarCard;