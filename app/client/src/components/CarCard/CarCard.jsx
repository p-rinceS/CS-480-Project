import './CarCard.css';

const CarCard = ({
    car,
    carModel,
    carYear,
    carColor,
    carTransmission,
    unBookable = false,
    onBookClick = () => {}
                 }) => {
    return (
        unBookable ? (
            <div className={'card-header-container'}>
                <div>Brand</div>
                <div>Model ID</div>
                <div>Year</div>
                <div>Color</div>
                <div>Transmission</div>
            </div>
        ) : (
            <div className={'car-card-container'}>
                <div>{car}</div>
                <div>{carModel}</div>
                <div>{carYear}</div>
                <div>{carColor}</div>
                <div>{carTransmission}</div>
                <button className={'book-button'} onClick={onBookClick}>
                    Book
                </button>
            </div>
        )
    );
}

export default CarCard;