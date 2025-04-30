import "./Registration.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addClient, addManager, checkUserExists } from "../../services/apiService.js";
import getCookie from "../../utils/getCookie.js";

const Registration = () => {
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  const emailRegex = /^(?:[a-z0-9!#$%&'*+\/=?^_`\{\|\}\~\-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`\{\|\}\~\-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9\-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
  const ssnRegex = /\d{9}/

  useEffect(() => {
    // Redirect to '/' if the user is already logged in
    if (getCookie("role")) {
      window.location.href = "/";
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (role === "client") {
      const clientName = formData.get("client-name");
      const clientEmail = formData.get("client-email");
      const homeRoad = formData.get("client-road");
      const homeNumber = formData.get("client-number");
      const homeCity = formData.get("client-city");
      try {
        const exists = await checkUserExists("client", clientEmail);
        if (!exists.exists) {
          await addClient(clientName, clientEmail, homeRoad, homeNumber, homeCity)
          document.cookie = `role=${role}; path=/;`;
          document.cookie = `identity=${JSON.stringify({name: clientName})}`;
          window.location.href = "/";
        } else {
          alert("User already exist");
        }
      } catch (error) {
        console.error("Error checking user:", error);
        alert("An error occurred. Please try again.");
      }
    } else if (role === "manager") {
      const managerName = formData.get("manager-name");
      const managerEmail = formData.get("manager-email");
      const managerSsn = formData.get("manager-ssn");
      try {
        const exists = await checkUserExists("manager", managerSsn);
        if (!exists.exists) {
          await addManager(managerName, managerEmail, managerSsn)
          document.cookie = `role=${role}; path=/;`;
          document.cookie = `identity=${JSON.stringify({name: managerName})}`;
          window.location.href = "/";
        } else {
          alert("User already exist");
        }
      } catch (error) {
        console.error("Error checking user:", error);
        alert("An error occurred. Please try again.");
      }
    } else {
      alert("Invalid role or missing identifier");
      return;
    }
  };

  return (
    <div className={"registration-container"}>
      <h1>Registration</h1>
      <div className={"registration-form"}>
        <form onSubmit={handleSubmit}>
          <div className={"form-container"}>
            <div className={"dropdown-container"}>
              <label htmlFor="role">Role:</label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="manager">Manager</option>
                <option value="client">Client</option>
              </select>
            </div>
            {role === "client" && (
              <div className="form-inputs">
                <div>
                  <label htmlFor="client-name">Name:</label>
                  <input
                    type="text"
                    id="client-name"
                    name="client-name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="client-email">Email:</label>
                  <input
                    type="text"
                    pattern={emailRegex.source}
                    id="client-email"
                    name="client-email"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="client-number">Address Number:</label>
                  <input
                    type="number"
                    id="client-number"
                    name="client-number"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="client-road">Address Road:</label>
                  <input
                    type="text"
                    id="client-road"
                    name="client-road"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="client-city">Address City:</label>
                  <input
                    type="text"
                    id="client-city"
                    name="client-city"
                    required
                  />
                </div>
              </div>
            )}
            {role === "manager" && (
              <div className="form-inputs">
                <div>
                  <label htmlFor="manager-name">Name:</label>
                  <input
                    type="text"
                    id="manager-name"
                    name="manager-name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="manager-email">Email:</label>
                  <input
                    type="text"
                    pattern={emailRegex.source}
                    id="manager-email"
                    name="manager-email"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="manager-ssn">SSN:</label>
                  <input
                    type="password"
                    pattern={ssnRegex.source}
                    id="manager-ssn"
                    name="manager-ssn"
                    required
                  />
                </div>
              </div>
            )}
            <button type="submit">Create Account</button>
          </div>
        </form>
      </div>
      <button onClick={() => navigate("/login")}>
        Login to Existing Account
      </button>
    </div>
  );
};

export default Registration;
