import { useNavigate } from "react-router-dom";
import './Header.css';
import useAuthStatus from "../../utils/hooks/useAuthStatus.jsx";

const Header = () => {
  const navigate = useNavigate();
  const isUserLoggedIn = useAuthStatus();
  return (
      <>
          <div className={'login-button'}>
              {isUserLoggedIn && (
                  <button onClick={() => {
                      // Add logout logic here
                      // delete cookie
                        // redirect to login page
                      document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                        navigate("/login");
                        //refresh page
                        window.location.reload();
                      console.log("User logged out");
                  }}>Logout</button>
              )}
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
