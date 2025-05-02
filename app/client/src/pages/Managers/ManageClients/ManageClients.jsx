import { useState } from "react";
import "./ManageClients.css";
import { getCityClients, getKClients } from "../../../services/apiService";

const ManageClients = () => {
  const [clients, setClients] = useState([]);

  const handleGetKClients = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const k = formData.get("k");

    const clientResponse = await getKClients(k);
    const mappedClients = clientResponse.map(([name, email]) => ({
      name,
      email,
    }));
    setClients(mappedClients);
  };

  const handleGetCityClients = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const city1 = formData.get("city1");
    const city2 = formData.get("city2");

    const clientResponse = await getCityClients(city1, city2);
    const mappedClients = clientResponse.map(([name, email]) => ({
      name,
      email,
    }));
    setClients(mappedClients);
  };

  return (
    <>
      <div className="manager-page">
        <div id="client-display" className="list">
          <h2>Clients</h2>
          <div className="client-filters">
            <form onSubmit={(event) => handleGetKClients(event)}>
              <h4>Top K Clients by Rent</h4>
              <input
                name="k"
                className="form-input"
                placeholder={"K"}
                required
              ></input>
              <button className="form-submit">Submit</button>
            </form>
            <form onSubmit={(event) => handleGetCityClients(event)}>
              <h4>City1 Clients Who Rented From City2 Driver</h4>
              <input
                name="city1"
                className="form-input"
                placeholder={"City 1"}
                required
              ></input>
              <input
                name="city2"
                className="form-input"
                placeholder={"City 2"}
                required
              ></input>
              <button className="form-submit">Submit</button>
            </form>
          </div>
          <div>
            {clients.map((client) => (
              <div key={client.name} className="client-list-item">
                <div className="client-info">
                  <h4 className="client-header">{client.name}</h4>
                  <h4 className="client-header">{client.email}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageClients;
