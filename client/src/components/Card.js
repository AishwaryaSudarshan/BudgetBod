import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ title, description, icon, redirectTo }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(redirectTo);
  };

  return (
    <div className="p-4 max-w-sm bg-white rounded-2xl border border-gray-200 shadow-md hover:bg-gray-100" onClick={handleClick}>
      <div className="flex flex-col items-center pb-10">
        <img className="mb-3 w-24 h-24" src={icon} alt="icon" />
        <h5 className="mb-1 text-xl font-medium text-gray-900">{title}</h5>
        <p className="text-base text-center m-2 text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default Card;
