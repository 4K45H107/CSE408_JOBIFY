"use client";

import axios from "axios";
import { createContext, useEffect, useState } from "react";

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
      const res = await axios.post("/api/login/employer", user);
      const data = res.data;

      setIsLoggedIn(true);
      setUserId(data._id);
      setRole(role);

      console.log(data);
      //router.push("/employer/addJobs");
    } catch (error) {
      console.log(error);
    }
  };

  const signup = (role) => {};

  const logout = () => {};

  useEffect(() => {
    if (userId) localStorage.setItem("userId", userId);
    if (role) localStorage.setItem("role", role);
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
