import unittest
from backend import generate

class TestRecipeGeneration(unittest.TestCase):
    
    def test_valid_inputs(self):
        preferences = {
            'dietaryPreferences': 'Vegetarian, Gluten-Free',
            'calorieLimit': 1500,
            'budget': 10
        }
        result = generate(preferences)
        self.assertIsNotNone(result)
        self.assertNotIn('error', result.lower())

    def test_invalid_calorie_limit(self):
        preferences = {
            'dietaryPreferences': 'Vegetarian, Gluten-Free',
            'calorieLimit': 'invalid', 
            'budget': 10
        }
        with self.assertRaises(ValueError):
            generate(preferences)

        def test_valid_with_exception_in_calorie_limit(self):
            preferences = {
                'dietaryPreferences': 'Vegetarian, Gluten-Free',
                'calorieLimit': Exception('forced exception'), 
                'budget': 10
            }
        with self.assertRaises(Exception):
            generate(preferences)

    def test_invalid_dietary_preferences(self):
        preferences = {
            'dietaryPreferences': 'invalid',  
            'calorieLimit': 1500,
            'budget': 10
        }
        with self.assertRaises(ValueError):
            generate(preferences)

    def test_invalid_dietary_preferences_and_calorie_limit(self):
        preferences = {
            'dietaryPreferences': 'invalid',  
            'calorieLimit': 'invalid', 
            'budget': 10
        }
        with self.assertRaises(ValueError):
            generate(preferences)

    def test_invalid_dietary_preferences_with_exception_in_calorie_limit(self):
        preferences = {
            'dietaryPreferences': 'invalid', 
            'calorieLimit': Exception('forced exception'), 
            'budget': 10
        }
        with self.assertRaises(Exception):
            generate(preferences)

    def test_exception_in_dietary_preferences(self):
        preferences = {
            'dietaryPreferences': Exception('forced exception'),
            'calorieLimit': 1500,
            'budget': 10
        }
        with self.assertRaises(Exception):
            generate(preferences)

    def test_valid_input_invalid_budget(self):
        preferences = {
            'dietaryPreferences': 'Vegan',
            'calorieLimit': 1200,
            'budget': 'Free'
        }
        with self.assertRaises(ValueError):
            generate(preferences)

    def test_valid_input_exception_in_budget(self):
        preferences = {
            'dietaryPreferences': 'Vegan',
            'calorieLimit': 1200,
            'budget': Exception('forced exception')
        }
        with self.assertRaises(Exception):
            generate(preferences)

if __name__ == '__main__':
    unittest.main()
