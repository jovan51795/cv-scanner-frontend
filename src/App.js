import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import Applicants from "./pages/Applicants";
import Rescan from "./pages/Rescan";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact={true} element={<Applicants />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/rescan" element={<Rescan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
