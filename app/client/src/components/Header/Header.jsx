import { useNavigate } from "react-router-dom";
import './Header.css';
import useAuthStatus from "../../utils/hooks/useAuthStatus.jsx";
import getCookie from "../../utils/getCookie.js";

const Header = () => {
  const navigate = useNavigate();
  const isUserLoggedIn = useAuthStatus();

  const getUserIdentifingName = () => {
        const role = getCookie('role');
        const identity = JSON.parse(getCookie('identity'));
        if (role === 'client') {
            return identity.name;
        } else if (role === 'driver') {
            return identity.name;
        } else if (role === 'manager') {
            return identity.ssn;
        } else if (role === 'admin') {
            return "Admin";
        }
  }
  return (
      <>
          <div className={'header-container'}>
          <div className={'hello-user-text'}>
                {isUserLoggedIn && (
                    <h3>Hello, {getUserIdentifingName()}!</h3>
                )}
          </div>
          <div className={'login-button'}>
              {isUserLoggedIn && (
                  <button onClick={() => {
                      // Add logout logic here
                      // delete cookie
                        // redirect to login page
                      document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                      document.cookie = "identity=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                      navigate("/login");
                        //refresh page
                        window.location.reload();
                      console.log("User logged out");
                  }}>Logout</button>
              )}
          </div>
          </div>
          {isUserLoggedIn && (
              <div className={'header-tabs'}>
                  <button onClick={() => navigate("/")}>Home</button>
                  <button onClick={() => navigate("/test")}>Test</button>
                  <button onClick={() => navigate("/clients")}>Clients</button>
              </div>
          )}
      </>
  );
};

export default Header;
