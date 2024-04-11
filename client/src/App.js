import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import Recipes from './pages/Recipes';
import SettingsPage from './pages/SettingsPage';
import MasonryImageList from './components/MasonryImageList';

// import './App.css';

function App() {
  return (
    <>
    <div className="">
      <Router>
      <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<MasonryImageList />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </Router>
      {/* <Chat />
      <SignInSide /> */}
    </div>
    </>
  );
}

export default App;