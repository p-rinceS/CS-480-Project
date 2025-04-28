import "./CarList.css";

// Displays all cars as list where cars can be deleted
const CarList = ({ cars }) => {
  return (
    <>
      <div className="car-list">
        {cars.map((car) => (
          <div key={car.carId} className="car-list-item">
            <h4 className="car-title">{car.brand}</h4>
            <button className="delete-button">Delete</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default CarList;
