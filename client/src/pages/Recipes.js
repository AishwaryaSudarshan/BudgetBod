import React, { useState } from 'react';

function Recipes() {
  // State to manage visibility of recipes information
  const [showRecipes, setShowRecipes] = useState(false);

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-3xl font-bold mb-4">Recipes</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowRecipes(!showRecipes)}
      >
        {showRecipes ? 'Re-Generate Recipes' : 'Generate Recipes'}
      </button>

      {showRecipes && (
        <div className="mt-4">
          <p>I've found some great gluten-free recipes that meet your criteria. Here are 3 options for you:</p>
          <ul className="list-disc mt-2">
            <li>
              <strong>Quinoa Salad with Black Beans and Avocado:</strong>
              <ul className="list-inside">
                <li>Calories: 380</li>
                <li>Cost: $10</li>
              </ul>
            </li>
            <li>
              <strong>Baked Lemon Herb Salmon:</strong>
              <ul className="list-inside">
                <li>Calories: 420</li>
                <li>Cost: $13</li>
              </ul>
            </li>
            <li>
              <strong>Vegetable Stir-Fry with Tofu:</strong>
              <ul className="list-inside">
                <li>Calories: 350</li>
                <li>Cost: $12</li>
              </ul>
            </li>
          </ul>
          <p>These recipes are delicious, gluten-free, within your calorie limit, and fit within your $15 budget.</p>
        </div>
      )}
    </div>
  );
}

export default Recipes;
