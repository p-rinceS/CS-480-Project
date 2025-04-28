import { useEffect, useState } from "react";
import "./ManageCars.css";
import { getCars, getModels } from "../../../services/apiService";
import ModelList from "../../../components/ModelList/ModelList";
import CarList from "../../../components/CarList/CarList";

/**
 * Managers should be able to insert or remove cars or models in the system
 *
 * Managers should be able to generate a list containing every current car model and
 * next to it the number of rents it has been used.
 */

const ManageCars = () => {
  const [models, setModels] = useState([]);
  const [cars, setCars] = useState([]);
  const [modelCars, setModelCars] = useState([]);
  const [carCaption, setCarCaption] = useState("Select a Model");

  // Fetches models and sets the state
  const getSetModels = async () => {
    const modelResponse = await getModels();
    const mappedModels = modelResponse.reduce(
      (accumulator, [modelId, color, year, transmission, carId]) => {
        if (!accumulator.find((model) => model.modelId === modelId)) {
          accumulator.push({
            modelId,
            color,
            year,
            transmission,
            carIds: [],
          });
        }
        accumulator
          .find((model) => model.modelId === modelId)
          .carIds.push(carId);
        return accumulator;
      },
      []
    );
    setModels(mappedModels);
  };

  // Fetches cars and sets the state
  const getSetCars = async () => {
    const carResponse = await getCars();
    const mappedCars = carResponse.map(([carId, brand]) => ({
      carId,
      brand,
    }));
    setCars(mappedCars);
  };

  // Fetches models and cars at start
  useEffect(() => {
    getSetModels();
    getSetCars();
  }, []);

  // Update car list when a model is selected
  const handleModelIdUpdate = (modelId) => {
    const selectedCarIds = models
      .filter((model) => model.modelId === modelId)
      .flatMap((model) => model.carIds);
    const selectedCars = cars.filter((car) =>
      selectedCarIds.includes(car.carId)
    );
    setModelCars(selectedCars);
    const selectedModel = models.find((model) => model.modelId === modelId);
    setCarCaption(
      `Showing ${selectedModel.transmission} ${selectedModel.color} ${selectedModel.year} Models`
    );
  };

  return (
    <>
      <div id="manage-cars-page">
        <div className="list">
          <h2>Models</h2>
          <h4>Select a Model to See Corresponding Cars</h4>
          <ModelList models={models} updateModelId={handleModelIdUpdate} />
        </div>
        <div className="list">
          <h2>Cars</h2>
          <h4>{carCaption}</h4>
          <CarList cars={modelCars} />
        </div>
      </div>
    </>
  );
};

export default ManageCars;
