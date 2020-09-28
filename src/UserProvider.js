import React, { useEffect, useState } from "react";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
        setUserInfo(userData);

    }, []);

    return (
        <UserContext.Provider
            value={{
                userInfo,
                setUserInfo
            }}
        >
            {children}
        </UserContext.Provider>
    );
};