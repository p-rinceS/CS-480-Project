import React, { useEffect, useState } from 'react';
import { getModels, assignDriverModel } from '../../api/apiService';

const ManageCars = () => {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [driverName, setDriverName] = useState('');

  useEffect(() => {
    const fetchModels = async () => {
      const data = await getModels();
      setModels(data);
    };
    fetchModels();
  }, []);

  const handleAssign = async () => {
    if (selectedModel && driverName) {
      await assignDriverModel(driverName, selectedModel.model_id, selectedModel.car_id);
      alert('Model assigned successfully!');
    } else {
      alert('Please select a model and enter your name.');
    }
  };

  return (
    <div>
      <h2>Manage Car Models</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={driverName}
        onChange={(e) => setDriverName(e.target.value)}
      />
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
