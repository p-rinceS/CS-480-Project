import React, { useEffect, useState } from 'react';
import {
  getAssignedModels,
  getAvailableModels,
  assignDriverModel,
} from '../../../services/apiService';
import useGetIdentity from "../../../utils/hooks/useGetIdentity.jsx";

const ManageCars = () => {
  const { identity } = useGetIdentity();
  const driverName = identity?.name;

  const [assignedModels, setAssignedModels] = useState([]);
  const [availableModels, setAvailableModels] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);

  const loadModels = async () => {
    if (!driverName) return;
    const assigned = await getAssignedModels(driverName);
    const available = await getAvailableModels(driverName);
    setAssignedModels(assigned || []);
    setAvailableModels(available || []);
    setSelectedModels([]);
  };

  useEffect(() => {
    loadModels();
  }, [driverName]);

  const handleSelect = (model) => {
    if (!selectedModels.find(
      (m) => m.model_id === model.model_id && m.car_id === model.car_id
    )) {
      setSelectedModels([...selectedModels, model]);
    }
  };

  const handleAssign = async () => {
    if (selectedModels.length === 0) {
      alert('Please select at least one model.');
      return;
    }

    for (const model of selectedModels) {
      await assignDriverModel(driverName, model.model_id, model.car_id);
    }

    alert('Models assigned successfully!');
    await loadModels();
  };

  const formatModel = (model) =>
    `${model.year}, ${model.color}, ${model.brand}, ${model.transmission}`;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div>
          <h3>Assigned Models</h3>
          <ul>
            {assignedModels.map((model) => (
              <li key={`${model.model_id}-${model.car_id}`}>
                {formatModel(model)}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Available Models</h3>
          <ul>
            {availableModels.map((model) => {
              const isSelected = selectedModels.some(
                (m) => m.model_id === model.model_id && m.car_id === model.car_id
              );
  
              return (
                <li key={`${model.model_id}-${model.car_id}`}>
                  {formatModel(model)}{' '}
                  <button
                    onClick={() => {
                      if (isSelected) {
                        setSelectedModels(
                          selectedModels.filter(
                            (m) =>
                              m.model_id !== model.model_id ||
                              m.car_id !== model.car_id
                          )
                        );
                      } else {
                        setSelectedModels([...selectedModels, model]);
                      }
                    }}
                    style={{
                      backgroundColor: isSelected ? '#333' : '#eee',
                      color: isSelected ? '#fff' : '#000',
                      border: '1px solid #ccc',
                      padding: '4px 8px',
                      cursor: 'pointer',
                      marginLeft: '8px',
                    }}
                  >
                    {isSelected ? 'Selected' : 'Select'}
                  </button>
                </li>
              );
            })}
          </ul>
          <button onClick={handleAssign}>Assign Selected Models</button>
        </div>
      </div>
    </div>
  );
};

export default ManageCars;
