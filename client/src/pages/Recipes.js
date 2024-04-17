import React, { useState, useEffect } from 'react';
import { recipes } from '../components/data.js';
import Slider from '@mui/material/Slider';


function Recipes() {
  const [displayedRecipes, setDisplayedRecipes] = useState(recipes);
  const [filters, setFilters] = useState({
    Vegan: false,
    Vegetarian: false,
    GlutenFree: false,
    DairyFree: false,
    NutFree: false,
    Kosher: false,
    Pescetarian: false,
    EggFree: false,
  });
  const [maxCalories, setMaxCalories] = useState(1000);
  const [maxBudget, setMaxBudget] = useState(20);

  useEffect(() => {
    const newDisplayedRecipes = recipes.filter((recipe) => {
      return (
        Object.keys(filters).every((filter) => {
          return !filters[filter] || recipe.tags.includes(filter);
        }) &&
        recipe.calories <= maxCalories &&
        recipe.price <= maxBudget
      );
    });
    setDisplayedRecipes(newDisplayedRecipes);
  }, [filters, maxCalories, maxBudget]); 

  const handleFilterChange = (filterName) => {
    setFilters({ ...filters, [filterName]: !filters[filterName] });
  };

  return (
    <>
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Preferences</h1> 

      <div className="filters mt-4 mb-4 flex justify-center"> 
        <button 
          className={`border border-black hover:bg-[#BFDAB3] text-black font-bold py-2 px-4 rounded mr-2 ${filters.Vegan ? 'bg-[#BFDAB3]' : ''}`}
          onClick={() => handleFilterChange('Vegan')}
        >
          Vegan
        </button>
        <button 
          className={`border border-black hover:bg-[#BFDAB3] text-black font-bold py-2 px-4 rounded mr-2 ${filters.Vegetarian ? 'bg-[#BFDAB3]' : ''}`}
          onClick={() => handleFilterChange('Vegetarian')}
        >
          Vegetarian
        </button>
        <button 
          className={`border border-black hover:bg-[#BFDAB3] text-black font-bold py-2 px-4 rounded mr-2 ${filters.GlutenFree ? 'bg-[#BFDAB3]' : ''}`}
          onClick={() => handleFilterChange('GlutenFree')}
        >
          Gluten Free
        </button>
        <button 
          className={`border border-black hover:bg-[#BFDAB3] text-black font-bold py-2 px-4 rounded mr-2 ${filters.DairyFree ? 'bg-[#BFDAB3]' : ''}`}
          onClick={() => handleFilterChange('DairyFree')}
        >
          Dairy Free
        </button>
        <button 
          className={`border border-black hover:bg-[#BFDAB3] text-black font-bold py-2 px-4 rounded mr-2 ${filters.NutFree ? 'bg-[#BFDAB3]' : ''}`}
          onClick={() => handleFilterChange('NutFree')}
        >
          Nut Free
        </button>
        <button 
          className={`border border-black hover:bg-[#BFDAB3] text-black font-bold py-2 px-4 rounded mr-2 ${filters.Kosher ? 'bg-[#BFDAB3]' : ''}`}
          onClick={() => handleFilterChange('Kosher')}
        >
          Kosher
        </button>
        <button 
          className={`border border-black hover:bg-[#BFDAB3] text-black font-bold py-2 px-4 rounded mr-2 ${filters.Pescatarian ? 'bg-[#BFDAB3]' : ''}`}
          onClick={() => handleFilterChange('Pescatarian')}
        >
          Pescetarian
        </button>
        <button 
          className={`border border-black hover:bg-[#BFDAB3] text-black font-bold py-2 px-4 rounded mr-2 ${filters.EggFree ? 'bg-[#BFDAB3]' : ''}`}
          onClick={() => handleFilterChange('EggFree')}
        >
          Egg Free
        </button>
      </div>
      <div className="flex justify-between mb-4">  {/* Flex container for sliders */}
          <div className="slider-container w-1/2 mr-2"> {/* Adjusted width and added margin-right */}
            <label className="block text-sm font-bold mb-2">Max Calories: {maxCalories}</label>
            <Slider
              value={maxCalories}
              onChange={(event, newValue) => setMaxCalories(newValue)}
              aria-labelledby="calories-slider"
              valueLabelDisplay="auto"
              color='black'
              min={100}
              max={2000}
              step={100}
            />
          </div>
          <div className="slider-container w-1/2 ml-2"> {/* Adjusted width and added margin-left */}
            <label className="block text-sm font-bold mb-2">Max Budget: ${maxBudget}</label>
            <Slider
              value={maxBudget}
              onChange={(event, newValue) => setMaxBudget(newValue)}
              aria-labelledby="budget-slider"
              valueLabelDisplay="auto"
              color='black'
              min={1}
              max={50}
              step={1}
            />
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold pl-14">Recipes</h1> 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-16">
        {displayedRecipes.map((recipe) => (
          <a href={recipe.link} target="_blank" rel="noreferrer" key={recipe.title} className="bg-white shadow-md rounded-md p-4 hover:bg-gray-200 transition duration-300 ease-in-out block">
            <h3 className="text-lg font-semibold">{recipe.title}</h3>
            <p>Calories: {recipe.calories}</p>
            <p>Price: ${recipe.price}</p>
          </a>
        ))}
      </div>

    </>
  );
}

export default Recipes;