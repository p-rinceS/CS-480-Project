import { useEffect } from "react";
import "./Popup.css";

const Popup = ({ show, onClose, children }) => {
  useEffect(() => {
    document.body.className = show ? "body-popup-show" : "body-popup-hide";
  }, [show]);

  return (
    <>
      {show && (
        <div className="popup-background">
          <div className="popup-body">
            <button className="close-button" onClick={onClose}>
              X
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
