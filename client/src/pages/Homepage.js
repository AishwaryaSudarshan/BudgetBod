import React from 'react';

function Homepage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-8">Welcome Page</h1>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        {/* Replace these image placeholders with your actual image paths or components */}
        <div className="col-span-1">
          <img src="/path-to-your-left-image.jpg" alt="Left collage" className="rounded-lg shadow-lg"/>
        </div>
        <div className="col-span-1 grid grid-rows-2 gap-4">
          <img src="/path-to-your-top-right-image.jpg" alt="Top right collage" className="rounded-lg shadow-lg"/>
          <img src="/path-to-your-bottom-right-image.jpg" alt="Bottom right collage" className="rounded-lg shadow-lg"/>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-5xl font-extrabold mb-4">BUDGETBOD</h2>
        <p className="mb-8">Track your fitness and calories in one place.</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300">
          GET STARTED
        </button>
      </div>
    </div>
  );
}

export default Homepage;
