import React, { useEffect, useState } from 'react';
import { getModels, assignDriverModel } from '../../../services/apiService';
import useGetIdentity from "../../../../utils/hooks/useGetIdentity.jsx";

const ManageCars = () => {
  const { identity } = useGetIdentity();
  const driverName = identity?.name;
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);

  useEffect(() => {
    const fetchModels = async () => {
      const data = await getModels();
      setModels(data || []);
    };
    fetchModels();
  }, []);

  const handleAssign = async () => {
    if (selectedModel && driverName) {
      await assignDriverModel(driverName, selectedModel.model_id, selectedModel.car_id);
      alert('Model assigned successfully!');
    } else {
      alert('Please select a model.');
    }
  };

  return (
    <div>
      <h2>Manage Car Models</h2>
      <ul>
        {models.map((model) => (
          <li key={`${model.model_id}-${model.car_id}`}>
            {model.brand} - {model.color} - {model.year} - {model.transmission}
            <button onClick={() => setSelectedModel(model)}>Select</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAssign}>Assign Selected Model</button>
    </div>
  );
};

export default ManageCars;
