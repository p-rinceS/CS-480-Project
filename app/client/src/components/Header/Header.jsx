import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  // Navigates between pages
  return (
    <div>
      <button onClick={() => navigate("/")}>Home</button>
      <button onClick={() => navigate("/app")}>App</button>
      <button onClick={() => navigate("/test")}>Test</button>
    </div>
  );
};

export default Header;
