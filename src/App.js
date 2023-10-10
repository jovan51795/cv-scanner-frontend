import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import Applicants from "./pages/Applicants";
import Rescan from "./pages/Rescan";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact={true} element={<Applicants />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/rescan" element={<Rescan />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
