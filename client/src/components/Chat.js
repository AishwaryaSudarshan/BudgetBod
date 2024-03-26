import React, { useState } from 'react';

const Chat = () => {
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
  const [calories, setCalories] = useState({min: 0, max: 5000});
  const [budget, setBudget] = useState({min: 0, max: 1000});

  const handleDietaryChange = (event) => {
    const value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setDietaryRestrictions(value);
  };

  const handleCaloriesChange = (event) => {
    setCalories({
      ...calories,
      [event.target.name]: parseInt(event.target.value, 10),
    });
  };

  const handleBudgetChange = (event) => {
    setBudget({
      ...budget,
      [event.target.name]: parseFloat(event.target.value),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const dataToSend = {
      dietaryRestrictions,
      calories,
      budget,
    };
    
    fetch('http://localhost:3001/generate-recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Handle success response
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle errors here
    });
  };

    // console.log(JSON.stringify(dataToSend));
    // Here you would typically send this data to your backend endpoint

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Dietary Restrictions:
        <select multiple={true} value={dietaryRestrictions} onChange={handleDietaryChange}>
          <option value="vegan">Vegan</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="glutenFree">Gluten Free</option>
          <option value="kosher">Kosher</option>
        </select>
      </label>
      <br />
      <label>
        Calories Range:
        Min: <input type="number" name="min" value={calories.min} onChange={handleCaloriesChange} />
        Max: <input type="number" name="max" value={calories.max} onChange={handleCaloriesChange} />
      </label>
      <br />
      <label>
        Budget Range ($):
        Min: <input type="number" step="0.01" name="min" value={budget.min} onChange={handleBudgetChange} />
        Max: <input type="number" step="0.01" name="max" value={budget.max} onChange={handleBudgetChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Chat;
