import { useEffect, useState } from "react";
import "./ManageAddress.css";
import { getDriverAddress, updateDriverAddress } from "../../../services/apiService";

/**
 * Drivers should be able to:
 * - View their address
 * - Set or update their address
 * Each address consists of: road name, number, and city
 * A driver can only have one address
 */

const ManageAddress = () => {
  const [address, setAddress] = useState({ road: "", number: "", city: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // Load existing address on mount
  useEffect(() => {
    const fetchAddress = async () => {
      const existingAddress = await getDriverAddress();
      if (existingAddress) {
        setAddress(existingAddress);
      }
    };
    fetchAddress();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  // Save/update address
  const handleSave = async () => {
    if (!address.road || !address.number || !address.city) {
      setStatusMessage("Please fill in all fields.");
      return;
    }
    await updateDriverAddress(address);
    setIsEditing(false);
    setStatusMessage("Address saved successfully!");
  };

  return (
    <div id="manage-address-page">
      <h2>Your Address</h2>

      {!isEditing ? (
        <div className="address-display">
          {address.road ? (
            <>
              <p><strong>Road:</strong> {address.road}</p>
              <p><strong>Number:</strong> {address.number}</p>
              <p><strong>City:</strong> {address.city}</p>
              <button onClick={() => setIsEditing(true)}>Edit Address</button>
            </>
          ) : (
            <>
              <p>No address found.</p>
              <button onClick={() => setIsEditing(true)}>Add Address</button>
            </>
          )}
        </div>
      ) : (
        <div className="address-form">
          <input
            type="text"
            name="road"
            placeholder="Road Name"
            value={address.road}
            onChange={handleChange}
          />
          <input
            type="text"
            name="number"
            placeholder="Number"
            value={address.number}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleChange}
          />
          <div className="buttons">
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      )}

      {statusMessage && <p className="status">{statusMessage}</p>}
    </div>
  );
};

export default ManageAddress;
