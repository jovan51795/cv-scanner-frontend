import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { getToken } from "./services/keycloak";
import CustomTheme from "./themes/CustomTheme";
import React from "react";

const Login = React.lazy(() => import("./pages/Login"));
const PrivateRoute = React.lazy(() => import("./pages/PrivateRoute"));

function App() {
  const isAuthenticated = getToken();
  return (
    <CustomTheme>
      <HashRouter>
        <Routes>
          <Route
            path="*"
            element={
              isAuthenticated ? <PrivateRoute /> : <Navigate to="/login" />
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </HashRouter>
    </CustomTheme>
  );
}

export default App;
