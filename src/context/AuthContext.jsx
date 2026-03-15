import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(localStorage.getItem("auth")==="true");

    const login = () => {
        localStorage.setItem("auth", "true");
        setIsAuth(true);
    };

    return (
        <AuthContext.Provider value={{ isAuth, login }}>
            {children}
        </AuthContext.Provider>
    );
};