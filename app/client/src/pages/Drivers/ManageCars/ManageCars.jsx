import React, { useEffect, useState } from 'react';
import {
  getAssignedModels,
  getAvailableModels,
  assignDriverModel,
  removeDriverModel,
} from '../../../services/apiService';
import useGetIdentity from '../../../utils/hooks/useGetIdentity.jsx';

const ManageCars = () => {
  const { identity } = useGetIdentity();
  const driverName = identity?.name;

  const [assignedModels, setAssignedModels] = useState([]);
  const [availableModels, setAvailableModels] = useState([]);

  const loadModels = async () => {
    if (!driverName) return;
    const [assigned, available] = await Promise.all([
      getAssignedModels(driverName),
      getAvailableModels(driverName),
    ]);
    setAssignedModels(assigned || []);
    setAvailableModels(available || []);
  };

  useEffect(() => {
    loadModels();
  }, [driverName]);

  const handleAction = async (model, actionFn, actionText) => {
    await actionFn(driverName, model.model_id, model.car_id);
    alert(`Model ${actionText} successfully!`);
    await loadModels();
  };

  const formatModel = ({ year, color, brand, transmission }) =>
    `${year}, ${color}, ${brand}, ${transmission}`;

  const ModelList = ({ models, actionFn, actionText }) => (
    <ul>
      {models.map((model) => (
        <li key={`${model.model_id}-${model.car_id}`}>
          {formatModel(model)}
          <button
            onClick={() => handleAction(model, actionFn, actionText)}
            style={{
              backgroundColor: actionText === 'assigned' ? '#444' : '#a00',
              color: '#fff',
              border: '1px solid #ccc',
              padding: '4px 8px',
              cursor: 'pointer',
              marginLeft: '8px',
            }}
          >
            {actionText === 'assigned' ? 'Assign' : 'Remove'}
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div>
          <h3>Assigned Models</h3>
          <ModelList
            models={assignedModels}
            actionFn={removeDriverModel}
            actionText="removed"
          />
        </div>

        <div>
          <h3>Available Models</h3>
          <ModelList
            models={availableModels}
            actionFn={assignDriverModel}
            actionText="assigned"
          />
        </div>
      </div>
    </div>
  );
};

export default ManageCars;
