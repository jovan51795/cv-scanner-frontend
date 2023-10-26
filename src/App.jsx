import {
  BrowserRouter,
  HashRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./pages/Login";
import PrivateRoute from "./pages/PrivateRoute";
import { getToken } from "./services/keycloak";
import CustomTheme from "./themes/CustomTheme";

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
