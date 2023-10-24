import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";

const Admin = React.lazy(() => import("./Admin"));

const PrivateRoute = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
};

export default PrivateRoute;
