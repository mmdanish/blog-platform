import React, { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import { toast } from "react-toastify";


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token); 
      setUser({ token, userId: decoded.userId });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setUser({ token, userId: decoded.userId });
  };

  const logout = (navigate) => {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Successfully logged out!")
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
