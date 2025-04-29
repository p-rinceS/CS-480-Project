import { useEffect, useState } from "react";
import "../Manager.css";
import "./ManageCars.css";
import {
  addCar,
  addModel,
  deleteCar,
  deleteModel,
  getCars,
  getModels,
} from "../../../services/apiService";
import Popup from "../../../components/Popup/Popup";

const ManageCars = () => {
  const [models, setModels] = useState([]);
  const [cars, setCars] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [selectedCarId, setSelectedCarId] = useState();
  const [modelCaption, setModelCaption] = useState("Select a Car");

  const [showModelPopup, setShowModelPopup] = useState(false);
  const [showCarPopup, setShowCarPopup] = useState();

  const [transmission, setTransmission] = useState();

  // Fetches cars and sets the state
  const fetchCars = async () => {
    const carResponse = await getCars();
    const mappedCars = carResponse.map(([carId, brand, rents]) => ({
      carId,
      brand,
      rents,
    }));
    setCars(mappedCars);
  };

  // Fetches models and sets the state
  const fetchModels = async () => {
    const modelResponse = await getModels();
    const mappedModels = modelResponse.map(
      ([modelId, color, year, transmission, carId, rents]) => ({
        modelId,
        color,
        year,
        transmission,
        carId,
        rents,
      })
    );
    setModels(mappedModels);
  };

  // Fetches data and updates it with rent info
  const fetchAllData = async () => {
    await Promise.all([fetchCars(), fetchModels()]);
  };

  // Fetches models and cars at start
  useEffect(() => {
    fetchAllData();
  }, []);

  // Update car list when a model is selected
  const handleCarIdUpdate = (carId) => {
    const selectedCar = cars.find((car) => car.carId === carId);
    if (selectedCar) {
      const selectedModels = models.filter((model) => model.carId === carId);

      setSelectedCarId(selectedCar.carId);
      setCarModels(selectedModels);
      setModelCaption(`Showing Models for ${selectedCar.brand}`);
    } else {
      setSelectedCarId();
      setCarModels([]);
      setModelCaption("Select a Car");
    }
  };

  // Updates car list when cars updated
  useEffect(() => {
    if (selectedCarId) {
      handleCarIdUpdate(selectedCarId);
    }
  }, [cars]);

  const handleAddCar = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const brand = formData.get("brand");

    await addCar(brand);
  };

  const handleAddModel = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const transmission = formData.get("transmission");
    const color = formData.get("color");
    const year = formData.get("year");
    const carId = formData.get("carId");

    await addModel(transmission, color, year, carId);
  };

  return (
    <>
      <div className="manager-page">
        <div id="car-display" className="list">
          <h2>Cars</h2>
          <button className="add-button" onClick={() => setShowCarPopup(true)}>
            + Car
          </button>
          <h4>Select a Car to See Respective Models</h4>
          <div>
            {cars.map((car) => (
              <div key={car.carId} className="car-list-item">
                <button
                  className="select-car"
                  onClick={() => handleCarIdUpdate(car.carId)}
                >
                  <h4 className="car-header">{car.brand}</h4>
                  <h4 className="car-header">{"Rents: " + car.rents}</h4>
                </button>
                <button
                  className="delete-button"
                  onClick={() =>
                    deleteCar(car.carId).then(() => fetchAllData())
                  }
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
        <div id="model-display" className="list">
          <h2>Models</h2>
          <button
            className="add-button"
            onClick={() => setShowModelPopup(true)}
          >
            + Model
          </button>
          <h4>{modelCaption}</h4>
          <div>
            {carModels.map((model) => (
              <div key={model.modelId} className="model-list-item">
                <div className="model-info">
                  <h4 className="model-header">
                    {model.transmission +
                      " " +
                      model.color +
                      " " +
                      model.year +
                      " Model"}
                  </h4>
                  <h4 className="model-header">{"Rents: " + model.rents}</h4>
                </div>
                <button
                  className="delete-button"
                  onClick={() =>
                    deleteModel(model.modelId).then(() => fetchAllData())
                  }
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Popup show={showCarPopup} onClose={() => setShowCarPopup(false)}>
        <h2>Add Car</h2>
        <form
          className="popup-elements"
          onSubmit={(event) => {
            handleAddCar(event).then(() => {
              fetchAllData();
            });
            setShowCarPopup(false);
          }}
        >
          <input
            name="brand"
            className="form-input"
            placeholder={"Brand"}
            required
          ></input>
          <button className="form-submit">Submit</button>
        </form>
      </Popup>
      <Popup show={showModelPopup} onClose={() => setShowModelPopup(false)}>
        <h2>Add Model</h2>
        <form
          className="popup-elements"
          onSubmit={(event) => {
            handleAddModel(event).then(() => {
              fetchAllData();
            });
            setShowModelPopup(false);
          }}
        >
          <select
            name="carId"
            className="form-input"
            value={selectedCarId}
            required
            onChange={(e) => setSelectedCarId(e.target.value)}
          >
            {cars.map((car) => (
              <option key={car.carId} value={car.carId}>
                {car.brand}
              </option>
            ))}
          </select>
          <select
            name="transmission"
            className="form-input"
            value={transmission}
            required
            onChange={(e) => setTransmission(e.target.value)}
          >
            <option value={"Automatic"}>Automatic</option>
            <option value={"Manual"}>Manual</option>
          </select>
          <input
            name="color"
            className="form-input"
            placeholder={"Color"}
            required
          ></input>
          <input
            type="number"
            name="year"
            className="form-input"
            placeholder={"Year"}
            required
          ></input>
          <button className="form-submit">Submit</button>
        </form>
      </Popup>
    </>
  );
};

export default ManageCars;
