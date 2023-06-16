import React from 'react';
import './App.css';
import {
  Route,
  Routes
} from 'react-router-dom';
import Home from './Pages/Home';
import NavBar from './Components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="Content">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
