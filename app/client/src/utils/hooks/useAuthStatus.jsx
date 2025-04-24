import { useState, useEffect } from "react";
import getCookie from "../getCookie.js";

const useAuthStatus = () => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
        const role = getCookie("role");
        const validRoles = ["manager", "client", "driver", "admin"];
        setIsUserLoggedIn(validRoles.includes(role));
    }, []);

    return isUserLoggedIn;
};

export default useAuthStatus;