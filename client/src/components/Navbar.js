import React from 'react';
import '../App.css';

const Navbar = () => {
  return (
    <nav className="bg-gray-100 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {/* Assuming you have SVG icons or images for these */}
          <a href="/" className="font-semibold text-gray-800 hover:text-gray-600 transition duration-300">Homepage</a>
          <a href="/recipes" className="font-semibold text-gray-800 hover:text-gray-600 transition duration-300">Recipes</a>
          <a href="/dashboard" className="font-semibold text-gray-800 hover:text-gray-600 transition duration-300">Dashboard</a>
          <a href="/settings" className="font-semibold text-gray-800 hover:text-gray-600 transition duration-300">Settings</a>
        </div>
        {/* <div className="flex items-center space-x-4">
          
          <button className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-400 transition duration-300">Logout</button>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
