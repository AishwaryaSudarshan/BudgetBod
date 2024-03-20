import React, { useState } from 'react';

function Chat() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRecipes = async () => {
    // Reset states
    setLoading(true);
    setError('');
    setRecipes([]);

    const requestData = {
      dietary_preference: 'gluten-free',
      calorie_amount: '1500 calories',
      budget_amount: '$15'
    };

    try {
      const response = await fetch('http://127.0.0.1:5000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status})`);
      }

      const data = await response.json();
      setRecipes(data.recipes);
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
      setError('Failed to fetch recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Recipe Generator</h2>
      <button onClick={fetchRecipes} disabled={loading}>
        {loading ? 'Loading...' : 'Get Recipes'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <p>{recipe}</p>
            </div>
          ))
        ) : (
          !loading && <p>No recipes to display. Click "Get Recipes" to start.</p>
        )}
      </div>
    </div>
  );
}

export default Chat;
