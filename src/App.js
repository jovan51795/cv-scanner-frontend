import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { getToken } from "./services/keycloak";
import PrivateRoute from "./pages/PrivateRoute";

function App() {
  const isAuthenticated = getToken();
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" exact={true} element={<Applicants />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/rescan" element={<Rescan />} /> */}
        <Route
          path="*"
          element={
            isAuthenticated ? <PrivateRoute /> : <Navigate to="/login" />
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
