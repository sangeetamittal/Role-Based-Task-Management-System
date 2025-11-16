import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem("user")) || null;
    });

    const [token, setToken] = useState(() => {
        return localStorage.getItem("token") || null;
    });

    const login = (userData, tokenData) => {
        setUser(userData);
        setToken(tokenData);

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", tokenData);
    };

    const logout = () => {
        setUser(null);
        setToken(null);

        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
