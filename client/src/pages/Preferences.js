import React, { useState } from 'react';
import { Slider, Button } from '@mui/material';
import { Logout } from '@mui/icons-material';

const Preferences = () => {
  const [goal, setGoal] = useState('lose');
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
  const [budget, setBudget] = useState(20);
  const [calories, setCalories] = useState(1500);

  const handleDietaryChange = (restriction) => {
    if (dietaryRestrictions.includes(restriction)) {
      setDietaryRestrictions(dietaryRestrictions.filter((item) => item !== restriction));
    } else {
      setDietaryRestrictions([...dietaryRestrictions, restriction]);
    }
  };

  const [recipes, setRecipes] = useState([]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      goal,
      dietaryRestrictions,
      budget,
      calories
    };
    try {
      const response = await fetch('http://localhost:5000/api/generate-recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setRecipes(data);
      } else {
        console.error('Failed to send form data');
        // Handle error gracefully, e.g., display an error message to the user
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network errors
    }
  };

  const RecipeCard = ({ recipe }) => {
    return (
      <div className="recipe-card">
        <h3>{recipe.nameOfDish}</h3>
        {/* Add other details like calories, price, ingredients, etc. */}
      </div>
    );
  };


  return (
    <div className="container mx-auto px-4 py-4">
      <div className='flex w-full h-12 gap-x-96'>
        <h1 className="text-3xl font-bold mb-36 mr-60 ml-64">Preferences</h1>
      </div>
    <div className='text-center'>
      <form onSubmit={handleSubmit}>
        <div className="text-2xl font-semibold mb-8 text-center">Goal</div>
        <div className="mb-16 flex justify-center gap-x-8">
          <button type="button" className={`px-16 py-4 rounded-lg ${goal === 'lose' ? 'bg-[#BFDAB3] shadow-lg' : 'bg-white shadow-md'}`} onClick={() => setGoal('lose')}>Lose Weight</button>
          <button type="button" className={`px-16 py-4 rounded-lg ${goal === 'gain' ? 'bg-[#BFDAB3] shadow-lg' : 'bg-white shadow-md'}`} onClick={() => setGoal('gain')}>Gain Weight</button>
        </div>
        <h2 className="text-2xl font-semibold">Dietary Restrictions</h2>
        <p className='mb-8'>Select all that apply.</p>
        <div className='flex justify-center'>
        <div className='flex flex-wrap gap-y-2 gap-x-16 mb-16 justify-center w-2/3'>
          {['Vegan', 'Vegetarian', 'Nut Free', 'Egg Free', 'Gluten Free', 'Dairy Free', 'Pescetarian', 'Kosher'].map((restriction, index) => (
            <div key={restriction} className={`flex justify-center w-1/5 p-1 ${index % 2 === 0 ? 'pr-1' : 'pl-1'}`}>
              <Button
                variant="outlined"
                onClick={() => handleDietaryChange(restriction)}
                className="h-20 w-64"
                style={{
                  color: 'black', 
                  borderColor: dietaryRestrictions.includes(restriction) ? '#BFDAB3' : 'white',
                  backgroundColor: dietaryRestrictions.includes(restriction) ? '#BFDAB3' : '',
                  boxShadow:'0px 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              >
                {restriction}
              </Button>
            </div>
          ))}
        </div>
        </div>

        <h2 className="text-2xl font-semibold my-4 mb-8">Budget Range</h2>
        <div className='flex flex-col items-center space-y-4'>
        <div className='relative w-1/2'>
          <Slider
            value={budget}
            onChange={(e, newVal) => setBudget(newVal)}
            aria-labelledby="budget-slider"
            min={5}
            max={35}
            style={{ color: 'black' }}
          />
          <div
            className='absolute'
            style={{
              left: `${((budget - 5) / (35 - 5)) * 100}%`,
              top: '-25px',
              transform: 'translateX(-50%)',
              color: 'black'
            }}
          >
            {budget}
          </div>
        </div>
        <div className='flex justify-between w-1/2 text-black'>
          <span>5</span>
          <span>35</span>
        </div>
      </div>
        <h2 className="text-2xl font-semibold my-8">Calories</h2>
        <div className='flex flex-col items-center space-y-4'>
        <div className='relative w-1/2'>
          <Slider
            value={calories}
            onChange={(e, newVal) => setCalories(newVal)}
            aria-labelledby="budget-slider"
            min={100}
            max={3000}
            style={{ color: 'black' }}
          />
          <div
            className='absolute'
            style={{
              left: `${((calories - 100) / (3000 - 100)) * 100}%`,
              top: '-25px',
              transform: 'translateX(-50%)',
              color: 'black'
            }}
          >
            {calories}
          </div>
        </div>
        <div className='flex justify-between w-1/2 text-black'>
          <span>100</span>
          <span>3000</span>
        </div>
      </div>
      <div className='mb-8'>
        <Button type="submit" 
        variant="contained"
        sx={{
          backgroundColor: 'white', 
          '&:hover': {
            backgroundColor: '#BFDAB3', 
          },
          color: 'black', 
        }}>
          Save
        </Button>
      </div>    
      </form>
      </div>
      <div className="recipes-container">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.nameOfDish} recipe={recipe} />
      ))}
      </div>
    </div>
  );
};

export default Preferences;
