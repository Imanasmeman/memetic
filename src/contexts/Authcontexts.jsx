// src/AuthContext.js
import React, { createContext, useEffect, useState, useContext } from "react";
import { auth } from "../firebase"; 
import { onAuthStateChanged } from "firebase/auth";

// Create Context
const AuthContext = createContext();

// Custom hook to access context
export const useAuth = () => useContext(AuthContext);

// Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    username: user?.email?.split("@")[0] || null, // extract name from email
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
