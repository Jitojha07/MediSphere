import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login/*" element={<Login/>} />
      <Route path="/signup/*" element={<Signup/>} />
    </Routes>
  );
}

export default App;