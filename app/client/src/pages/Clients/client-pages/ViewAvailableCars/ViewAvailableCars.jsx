import './ViewAvailableCars.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useEffect, useState} from "react";
import CarCard from "../../../../components/CarCard/CarCard.jsx";
import {getAvailableCars} from "../../../../services/apiService.js";


const ViewAvailableCars = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [availableCars, setAvailableCars] = useState([]);
    useEffect(() => {
        getAvailableCars(startDate)
            .then((response) => {
                const mappedCars = Array.isArray(response)
                    ? response.map(car => ({
                        carId: car[0],             // ID
                        car: car[1],               // Brand
                        carModel: car[2],          // Model ID
                        carColor: car[3],          // Color
                        carYear: car[4],           // Year
                        carTransmission: car[5],   // Transmission
                    }))
                    : [];

                setAvailableCars(mappedCars);
                console.log("Mapped Cars: ", mappedCars);
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
    }, [startDate]);

    return (

        <div className={'view-available-cars-container'}>
            <h2>Available Cars</h2>
            <p> select a date to view car availability </p>
            <DatePicker showMonthYearDropdown={true} selected={startDate} onChange={(date) =>{
setStartDate(date)
            }}
            />
            <div className={'available-cars-list'}>
                <div className={'all-cars-container'}>
                    {
                        availableCars && availableCars.map((car) => {
                            return (
                                <CarCard
                                    key={car.carId}
                                    car={car.car}
                                    carModel={car.carModel}
                                    carYear={car.carYear}
                                    carColor={car.carColor}
                                    carTransmission={car.carTransmission}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ViewAvailableCars;