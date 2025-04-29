import { useEffect, useState } from "react";
import "./ManageDrivers.css";
import { getModels, declareModelForDriver } from "../../../services/apiService";

/**
 * Drivers should be able to:
 * - See a list of all car models
 * - Declare what car models they can drive
 */

const ManageDrivers = () => {
  const [models, setModels] = useState([]);
  const [declaredModels, setDeclaredModels] = useState(new Set());

  // Fetch car models and populate state
  const fetchModels = async () => {
    const modelResponse = await getModels();
    const uniqueModels = modelResponse.reduce((accumulator, [modelId, color, year, transmission]) => {
      if (!accumulator.find((model) => model.modelId === modelId)) {
        accumulator.push({ modelId, color, year, transmission });
      }
      return accumulator;
    }, []);
    setModels(uniqueModels);
  };

  useEffect(() => {
    fetchModels();
  }, []);

  // Handle driver declaring a model
  const handleDeclareModel = async (modelId) => {
    if (declaredModels.has(modelId)) return; // already declared
    await declareModelForDriver(modelId); // API call
    setDeclaredModels((prev) => new Set(prev).add(modelId));
  };

  return (
    <div id="manage-drivers-page">
      <div className="list">
        <h2>Available Car Models</h2>
        <h4>Click on a model to declare you can drive it</h4>
        <ul>
          {models.map(({ modelId, color, year, transmission }) => (
            <li
              key={modelId}
              className={declaredModels.has(modelId) ? "declared" : ""}
              onClick={() => handleDeclareModel(modelId)}
            >
              {transmission} {color} {year} — {declaredModels.has(modelId) ? "Declared" : "Click to declare"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageDrivers;
