import React from "react";
import { Route, Routes } from "react-router-dom";

const Admin = React.lazy(() => import("./Admin"));

const PrivateRoute = () => {
  return (
    <Routes>
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};

export default PrivateRoute;
