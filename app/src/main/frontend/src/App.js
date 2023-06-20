import React from 'react';
import './App.css';
import {
  Route,
  Routes
} from 'react-router-dom';
import Home from './Pages/Home';
import Metrics from './Pages/Metrics';
import NavBar from './Components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="Content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/metrics" element={<Metrics />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
