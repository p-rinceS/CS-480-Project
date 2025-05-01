import React, { useEffect, useState } from 'react';
import { getDriverAddress, updateDriverAddress } from '../../../services/apiService';
import useGetIdentity from "../../../utils/hooks/useGetIdentity.jsx";

const ManageAddress = () => {
  const { identity } = useGetIdentity();
  const driverName = identity?.name;

  const [address, setAddress] = useState({ road: '', number: '', city: '' });
  const [currentAddress, setCurrentAddress] = useState(null);

  useEffect(() => {
    const fetchAddress = async () => {
      if (driverName) {
        const response = await getDriverAddress(driverName);
        if (response && response.road && response.number && response.city) {
          setCurrentAddress({
            road: response.road,
            number: response.number,
            city: response.city
          });
        } else {
          setCurrentAddress(null);
        }
      }
    };
    fetchAddress();
  }, [driverName]);

  const handleUpdate = async () => {
    if (address.road && address.number && address.city) {
      await updateDriverAddress(driverName, address.road, address.number, address.city);
      alert('Address updated successfully!');
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div>
      <h2>Manage Address</h2>

      <div style={{ marginBottom: '1rem' }}>
        <strong>Current Address:</strong>{' '}
        {currentAddress
          ? `${currentAddress.road} ${currentAddress.number}, ${currentAddress.city}`
          : 'N/A'}
      </div>

      <div>
        <input
          type="text"
          placeholder="Road"
          value={address.road}
          onChange={(e) => setAddress({ ...address, road: e.target.value })}
        />
        <input
          type="number"
          placeholder="Number"
          value={address.number}
          onChange={(e) => setAddress({ ...address, number: e.target.value })}
        />
        <input
          type="text"
          placeholder="City"
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
        />
      </div>

      <button onClick={handleUpdate}>Update Address</button>
    </div>
  );
};

export default ManageAddress;
