import os
import json
import pytest
from unittest.mock import patch
from generate import generate_recipes

@pytest.fixture
def mock_openai():
    # Mocking the OpenAI client
    with patch('generate.openai') as mock_openai:
        yield mock_openai

def test_generate_recipes(mock_openai):
    # Mock preferences
    test_preferences = {
        'goal': 'lose',
        'dietaryRestrictions': ['gluten-free'],
        'budget': 20,
        'calories': 1500
    }

    # Mock OpenAI response
    response_content = {
        "recipe1": {
            "Name of Dish": "Dish1",
            "Calorie Amount": 500,
            "Price of All Ingredients": 10,
        },
        "recipe2": {
            "Name of Dish": "Dish2",
            "Calorie Amount": 600,
            "Price of All Ingredients": 15,
        },
        "recipe3": {
            "Name of Dish": "Dish3",
            "Calorie Amount": 400,
            "Price of All Ingredients": 8,
        }
    }

    mock_openai.beta.assistants.run.return_value = response_content

    # Call the function
    recipes = generate_recipes(test_preferences)

    # Verify the output
    assert isinstance(recipes, str)
    assert json.loads(recipes) == response_content

    # Verify OpenAI client called with correct parameters
    mock_openai.beta.assistants.run.assert_called_once_with(
        thread.id, assistant, {"messages": [{"role": "user", "content": "As BudgetBod, generate 3 meal recipes that are gluten-free, approximately 1500 calories, and cost under $20. Provide each recipe in JSON format with keys 'Name of Dish', 'Calorie Amount', 'Price of All Ingredients', 'Number of Servings', and 'List of Steps'."}]}
    )
