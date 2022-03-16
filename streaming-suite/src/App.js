// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./Pages/Admin";
import Home from './Pages/Home';
import Login from "./Pages/Login";
import Navigation from "./Pages/Navigation";
import Register from "./Pages/Register";
import Watchlist from "./Pages/Watchlist";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="watchlist" element={<Watchlist />} />
          <Route path="admin" element={<Admin />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<p>Page does not exist</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
