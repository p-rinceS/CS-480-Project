import './BookRent.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useEffect, useState} from "react";
import CarCard from "../../../../components/CarCard/CarCard.jsx";
import {bookRent, getAvailableCars} from "../../../../services/apiService.js";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner.jsx";
import useGetIdentity from "../../../../utils/hooks/useGetIdentity.jsx";
import {useNavigate} from "react-router-dom";


const BookRent = () => {
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState(new Date());
    const [availableCars, setAvailableCars] = useState([]);
    const {identity} = useGetIdentity();
    const navigate = useNavigate();
    useEffect(() => {
        getAvailableCars(startDate)
            .then((response) => {
                const mappedCars = Array.isArray(response)
                    ? response.map(car => ({
                        carId: car[0],
                        car: car[1],
                        carModel: car[2],
                        carColor: car[3],
                        carYear: car[4],
                        carTransmission: car[5],
                    }))
                    : [];
                setLoading(false);
                setAvailableCars(mappedCars);
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
    }, [startDate]);

    const handleBookClick = (carId, modelId) => {
        bookRent(carId, modelId, identity.email, startDate).then(() => {
            navigate("/rent-history");
        });
    }

    return (
        <div className={'view-available-cars-container'}>
            <h2>Available Cars</h2>
            <p> select a date to view car availability </p>
            <DatePicker showIcon showMonthYearDropdown={true} selected={startDate} onChange={(date) =>{
setStartDate(date)
            }}
            />
            <LoadingSpinner loading={loading}></LoadingSpinner>
            <div className={'available-cars-list'}>
                <div className={'all-cars-container'}>
                    <CarCard
                        car={"Brand"}
                        carModel={"Model ID"}
                        carYear={"Year"}
                        carColor={"Color"}
                        carTransmission={"Transmission"}
                        unBookable={true}
                    />
                    {
                        availableCars && availableCars.length > 0 ? (
                            availableCars.map((car) => {
                                return (
                                    <CarCard
                                        key={car.carId}
                                        car={car.car}
                                        carModel={car.carModel}
                                        carYear={car.carYear}
                                        carColor={car.carColor}
                                        carTransmission={car.carTransmission}
                                        onBookClick={() => handleBookClick(car.carId, car.carModel)}
                                    />
                                );
                            })
                        ) : (
                            <div className={'no-cars-text'}>No cars available to rent for the selected date.</div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default BookRent;