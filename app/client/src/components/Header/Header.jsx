import { useNavigate } from "react-router-dom";
import './Header.css';
import useAuthStatus from "../../utils/hooks/useAuthStatus.jsx";
import getCookie from "../../utils/getCookie.js";

export const getUserIdentifingName = () => {
    const role = getUserRole();
    const identity = JSON.parse(getCookie('identity'));
    if (role === 'client') {
        return identity.name + " (" + role + ")";
    } else if (role === 'driver') {
        return identity.name + " (" + role + ")";
    } else if (role === 'manager') {
        return identity.ssn + " (" + role + ")";
    } else if (role === 'admin') {
        return "Admin";
    }
}



export const getUserRole = () => {
    return getCookie('role');
}


const Header = () => {
  const navigate = useNavigate();
  const isUserLoggedIn = useAuthStatus();

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
                      document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                      document.cookie = "identity=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                      navigate("/login");
                      window.location.reload();
                      console.log("User logged out");
                  }}>Logout</button>
              )}
          </div>
          </div>
          {isUserLoggedIn && (
              <section>
              {
                  getUserRole() === 'admin' && (
                      <>
                          <div> debug panel</div>
                          <div className={'header-tabs'}>
                              <>
                                  <button onClick={() => navigate("/")}>Home</button>
                                  <button onClick={() => navigate("/managers")}>Managers</button>
                                  <button onClick={() => navigate("/clients")}>Clients</button>
                                  <button onClick={()  => navigate("/drivers")}> Drivers</button>
                              </>
                          </div>
                      </>
                      )
                  }
                  {
                      getUserRole() === 'manager' && (
                          <>
                              <div className={'header-tabs'}>
                                  <>
                                      <button onClick={() => navigate("/manage-cars")}>Manage Cars</button>
                                      <button onClick={() => navigate("/manage-drivers")}>Manage Drivers</button>
                                      <button onClick={() => navigate("/top-clients")}>Top Clients</button>
                                      <button onClick={() => navigate("/locate-clients")}>Locate Clients</button>
                                  </>
                              </div>
                          </>
                      )
                  }
                  {
                      getUserRole() === 'client' && (
                          <>
                              <div className={'header-tabs'}>
                                  <>
                                      <button onClick={() => navigate("/")}>Home</button>
                                      <button onClick={() => navigate("/payment-info")}>My Payment Info</button>
                                      <button onClick={() => navigate("/rent-history")}>My Rental History</button>
                                      <button onClick={() => navigate("/write-a-review")}>Review a Driver</button>
                                      <button onClick={() => navigate("/view-available-cars")}>View Cars</button>
                                      <button onClick={() => navigate("/book-rent")}>Book a Rent</button>
                                  </>
                              </div>
                          </>
                      )
                  }
                  {
                      getUserRole() === 'driver' && (
                          <>
                              <div className={'header-tabs'}>
                                  <>
                                      <button onClick={() => navigate("/manage-address")}>Manage Address</button>
                                      <button onClick={() => navigate("/manage-cars")}>Manage Cars</button>
                                      <button onClick={() => navigate("/my-reviews")}>My Reviews</button>
                                  </>
                              </div>
                          </>
                      )
                  }
              </section>
          )}

                  {/* CLIENT ONLY NAVIGATION  */}
                  {/* MANAGER ONLY NAVIGATION   */}
                  {/* DRIVER ONLY NAVIGATION   */}

      </>
  );
};

export default Header;
