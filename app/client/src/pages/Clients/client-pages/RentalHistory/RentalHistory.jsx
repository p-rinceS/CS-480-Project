import './RentalHistory.css';
import {getRentalHistory} from "../../../../services/apiService.js";
import {useEffect, useState} from "react";
import useGetIdentity from "../../../../utils/hooks/useGetIdentity.jsx";
import RentalHistoryCard from "../../../../components/RentalHistoryCard/RentalHistoryCard.jsx";




const RentalHistory = () => {

    const [loading, setLoading] = useState(true);
    const [rentalHistory, setRentalHistory] = useState([]);
    const {identity} = useGetIdentity();
    useEffect(() => {
        // get rental history
        getRentalHistory(identity.email).then(
            (response) => {
                const mappedHistory = Array.isArray(response)
                    ? response.map(rent => ({
                        car: rent[0],
                        carDriver: rent[6],
                        carModel: rent[2],
                        carYear: rent[4],
                        carColor: rent[3],
                        carTransmission: rent[5],
                        date: rent[7],
                        rent_id: rent[8],
                    }))
                    : [];
                setLoading(false);
                setRentalHistory(mappedHistory);
            }
        ).catch((error) => {
            console.log("Error: ", error);
        }
        )
    }, []);

    useEffect(() => {
        console.log("Rental History: ", rentalHistory);
    }, [rentalHistory]);
    return (
        <div className={'rental-history-container'}>
            <div className={'past-rents'}>
                <h2>Past Rents</h2>
                {rentalHistory
                    .filter(rent => new Date(rent.date) < new Date())
                    .map((rent, index) => (
                        <RentalHistoryCard
                            key={index}
                            car={rent.car}
                            carModel={rent.carModel}
                            carYear={rent.carYear}
                            carColor={rent.carColor}
                            carTransmission={rent.carTransmission}
                            date={rent.date}
                            carDriver={rent.carDriver}
                            rent_id={rent.rent_id}                        />
                    ))}
            </div>
            <div className={'upcoming-rents'}>
                <h2>Upcoming Rentals</h2>
                {rentalHistory
                    .filter(rent => new Date(rent.date) >= new Date())
                    .map((rent, index) => (
                        <RentalHistoryCard
                            key={index}
                            car={rent.car}
                            carModel={rent.carModel}
                            carYear={rent.carYear}
                            carColor={rent.carColor}
                            carTransmission={rent.carTransmission}
                            date={rent.date}
                            carDriver={rent.carDriver}
                            rent_id={rent.rent_id}
                        />
                    ))}
            </div>
        </div>
    );
}

export default RentalHistory;