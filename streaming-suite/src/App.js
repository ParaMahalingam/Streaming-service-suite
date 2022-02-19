// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Navigation from "./Pages/Navigation";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          {/* <Route path="results" element={<Results />} /> */}
          <Route path="*" element={<p>Page does not exist</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
