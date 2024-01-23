import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";

const Admin = React.lazy(() => import("./Admin"));
const Applicants = React.lazy(() => import("./Applicants"));

const PrivateRoute = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/scan" element={<Applicants />} />
      </Routes>
    </>
  );
};

export default PrivateRoute;
