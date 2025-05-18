// App.jsx
import React from "react";
import AuthForm from "./Authform";
import MemeEditor from "./MemeEditer";
import { useAuth } from "./contexts/Authcontexts";
import {Routes, Route, Navigate} from "react-router";
import Navbar from "./components/Navbar";
import MemeScroller from "./Memescroll";
const App = () => {
  const { user } = useAuth();

  return (
    <>
    <Navbar />
    <Routes>
      {/* If logged in, go to editor; else login */}
      <Route
        path="/"
        element={<Navigate to={user ? "/feed" : "/login"} replace />}
      />
      <Route path="/feed" element={<MemeScroller />} />
      <Route
        path="/login"
        element={!user ? <AuthForm /> : <Navigate to="/feed" replace />}
      />
      <Route
        path="/editor"
        element={user ? <MemeEditor /> : <Navigate to="/login" replace />}
      />
      
    </Routes>
     </>
  );
 
};

export default App;
