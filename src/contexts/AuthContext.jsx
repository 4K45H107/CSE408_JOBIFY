"use client";

import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext();

const getUserIdFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem("userId");
    return value || null;
  }
};

const getRoleFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem("role");
    return value || null;
  }
};

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [userId, setUserId] = useState(() => getUserIdFromLocalStorage());
  const [role, setRole] = useState(() => getRoleFromLocalStorage());

  const login = async (role, user) => {
    try {
      console.log("inside context login");

      let res;

      if (role === "employer") {
        res = await axios.post("/api/login/employer", user);
      } else {
        res = await axios.post("/api/login/user", user);
      }
      const data = res.data;

      setIsLoggedIn(true);
      setUserId(data._id);
      setRole(role);

      console.log(data);
    } catch (error) {
      toast.error("Invalid Credentials");
      console.log(error);
    }
  };

  const signup = async (role, user) => {};

  const logout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    setRole(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
  };

  useEffect(() => {
    if (userId) localStorage.setItem("userId", userId);
    if (role) localStorage.setItem("role", role);
    if (userId && role) setIsLoggedIn(true);
  }, [userId, role]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userId,
        role,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
