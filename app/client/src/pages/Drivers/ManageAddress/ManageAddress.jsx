import React, { useEffect, useState } from 'react';
import { getDriverAddress, updateDriverAddress } from '../../../services/apiService';
import useGetIdentity from "../../../utils/hooks/useGetIdentity.jsx";

const ManageAddress = () => {
  const { identity } = useGetIdentity();
  const driverName = identity?.name;
  const [address, setAddress] = useState({ road: '', number: '', city: '' });

  useEffect(() => {
    const fetchAddress = async () => {
      if (driverName) {
        const data = await getDriverAddress(driverName);
        setAddress(data || { road: '', number: '', city: '' });
      }
    };
    fetchAddress();
  }, [driverName]);

  const handleUpdate = async() => {
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
