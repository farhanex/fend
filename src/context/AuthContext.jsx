import React, { createContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { URL } from "../App"; 

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = () => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(storedUser);
      if (location.pathname === "/") {
        navigate("/dashboard", { replace: true });
      }
    }
  };

  const loginUser = async (userData) => {
    try {
      const url = `${URL}/api/auth/login`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", result.admin.name);
        setUser(result.admin.name);
        navigate("/dashboard", { replace: true });
      } else {
        console.error(result.msg || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err.message);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/", { replace: true });
  };

  return (
    <AuthContext.Provider
      value={{ loginUser, logoutUser, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
