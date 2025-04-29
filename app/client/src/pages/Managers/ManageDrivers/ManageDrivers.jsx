import { useState, useEffect } from "react";
import "../Manager.css";
import "./ManageDrivers.css";
import {
  addDriver,
  deleteDriver,
  getDrivers,
} from "../../../services/apiService";
import Popup from "../../../components/Popup/Popup";

const ManageDrivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [showDriverPopup, setShowDriverPopup] = useState(false);

  // Fetch driver info
  const fetchDrivers = async () => {
    const driverResponse = await getDrivers();
    const mappedDrivers = driverResponse.map(
      ([name, homeRoad, homeNumber, homeCity, rents, rating]) => ({
        name,
        homeRoad,
        homeNumber,
        homeCity,
        rents,
        rating,
      })
    );
    setDrivers(mappedDrivers);
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  // Send add driver info to backend
  const handleAddDriver = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const homeRoad = formData.get("homeRoad");
    const homeNumber = formData.get("homeNumber");
    const homeCity = formData.get("homeCity");

    await addDriver(name, homeRoad, homeNumber, homeCity);
  };

  return (
    <>
      <div className="manager-page">
        <div id="driver-display" className="list">
          <h2>Drivers</h2>
          <button
            className="add-button"
            onClick={() => setShowDriverPopup(true)}
          >
            + Driver
          </button>
          <div>
            {drivers.map((driver) => (
              <div key={driver.name} className="driver-list-item">
                <div className="driver-info">
                  <h4 className="driver-name-header">{driver.name}</h4>
                  <h4 className="driver-address-header">
                    {"Address: " +
                      driver.homeNumber +
                      " " +
                      driver.homeRoad +
                      ", " +
                      driver.homeCity}
                  </h4>
                  <h4 className="driver-rent-header">
                    {"Rents: " + driver.rents}
                  </h4>
                  <h4 className="driver-rating-header">
                    {"Rating: " +
                      (driver.rating ? driver.rating.toFixed(1) : "N/A")}
                  </h4>
                </div>
                <button
                  className="delete-button"
                  onClick={() =>
                    deleteDriver(driver.name).then(() => fetchDrivers())
                  }
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Popup show={showDriverPopup} onClose={() => setShowDriverPopup(false)}>
        <h2>Add Driver</h2>
        <form
          className="popup-elements"
          onSubmit={(event) => {
            handleAddDriver(event).then(() => {
              fetchDrivers();
            });
            setShowDriverPopup(false);
          }}
        >
          <input
            name="name"
            className="form-input"
            placeholder={"Name"}
            required
          ></input>
          <input
            name="homeNumber"
            className="form-input"
            placeholder={"Number"}
            required
          ></input>
          <input
            name="homeRoad"
            className="form-input"
            placeholder={"Road"}
            required
          ></input>
          <input
            name="homeCity"
            className="form-input"
            placeholder={"City"}
            required
          ></input>
          <button className="form-submit">Submit</button>
        </form>
      </Popup>
    </>
  );
};

export default ManageDrivers;
