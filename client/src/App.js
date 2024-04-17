import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import Recipes from './pages/Recipes';
import Preferences from './pages/Preferences';
import MasonryImageList from './components/MasonryImageList';
import FAQ from './pages/Faq';

// import './App.css';

function App() {
  return (
    <>
    <div className="">
      <Router>
      <div>
      <Navbar />
      <Routes>
          <Route path="/login" element={<MasonryImageList />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </div>
    </Router>
    </div>
    </>
  );
}

export default App;