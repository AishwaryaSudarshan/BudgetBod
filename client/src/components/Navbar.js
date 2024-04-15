import React from 'react';
import '../App.css';
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";


const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <nav className="p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center ml-auto space-x-4">
          <a href="/home" className="p-2 font-semibold text-gray-800 hover:bg-[#BFDAB3] hover:rounded-lg transition duration-300">Homepage</a>
          <a href="/recipes" className="p-2 font-semibold text-gray-800 hover:bg-[#BFDAB3] hover:rounded-lg transition duration-300">Recipes</a>
          <a href="/dashboard" className="p-2 font-semibold text-gray-800 hover:bg-[#BFDAB3] hover:rounded-lg transition duration-300">Dashboard</a>
          <a href="/settings" className="p-2 font-semibold text-gray-800 hover:bg-[#BFDAB3] hover:rounded-lg transition duration-300">Settings</a>
          <a href="/faq" className="p-2 font-semibold text-gray-800 hover:bg-[#BFDAB3] hover:rounded-lg transition duration-300">FAQ</a>
          {isAuthenticated && ( 
            <div className="logout button"><LogoutButton/></div>
          )}

        </div>
        {/* <div className="flex items-center space-x-4">      
          <button className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-400 transition duration-300">Logout</button>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
