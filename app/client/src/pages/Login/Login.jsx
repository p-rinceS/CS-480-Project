import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkUserExists } from "../../services/apiService.js";
import getCookie from "../../utils/getCookie.js";

const Login = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [ssn, setSsn] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to '/' if the user is already logged in
    if (getCookie("role")) {
      window.location.href = "/";
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let identify = "";
    if (role === "client" && email) {
      identify = email;
    } else if (role === "driver" && name) {
      identify = name;
    } else if (role === "manager" && ssn) {
      identify = ssn;
    } else if (role === "admin") {
      document.cookie = `role=${role}; path=/;`;
      window.location.href = "/";
      return;
    } else {
      alert("Invalid role or missing identifier");
      return;
    }
    try {
      const exists = await checkUserExists(role, identify);
      if (exists.exists) {
        document.cookie = `role=${role}; path=/;`;
        document.cookie = `identity=${JSON.stringify(exists.client)}`;
        window.location.href = "/";
      } else {
        alert("User does not exist");
      }
    } catch (error) {
      console.error("Error checking user:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className={"login-container"}>
      <h1>Login</h1>
      <div className={"login-form"}>
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
                {/* <option value="admin">Admin</option> */}
                <option value="manager">Manager</option>
                <option value="client">Client</option>
                <option value="driver">Driver</option>
              </select>
            </div>
            {role === "client" && (
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            )}
            {role === "driver" && (
              <div>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            {role === "manager" && (
              <div>
                <label htmlFor="ssn">SSN:</label>
                <input
                  type="text"
                  id="ssn"
                  name="ssn"
                  value={ssn}
                  onChange={(e) => setSsn(e.target.value)}
                />
              </div>
            )}
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
      <button onClick={() => navigate("/registration")}>
        Create New Account
      </button>
    </div>
  );
};

export default Login;
