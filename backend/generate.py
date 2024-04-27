import time 
from openai import OpenAI
from dotenv import load_dotenv, find_dotenv
import os
import json
import openai
from flask import Flask, request

load_dotenv(find_dotenv())

OPENAI_API_KEY= os.getenv('OPENAI_API_KEY')
ASSISTANT_ID= os.getenv('ASSISTANT_ID')


client = OpenAI(api_key=OPENAI_API_KEY)

# assistant = client.beta.assistants.create(
#         name="BudgetBod Assistant",
#         instructions="You are BudgetBod, perfect for crafting meals that fit dietary needs, calorie goals, and budget. With preferences like this - generate recipes that are 'dietary preference', 'calorie amount', 'budget amount'. You will respond with a JSON-formatted message, providing exactly 3 meals that meet the criteria with in depth info on the recipe.",
#         #instructions="As BudgetBod, your role is to assist users in finding meals that align with their dietary preferences, calorie goals, and budget limits. Upon receiving user criteria, which include dietary preference, target calorie count, and budget limit, you are tasked with generating a response that provides three meal suggestions meeting these specifications. For each meal suggestion, the response must be in JSON format and include: 'Name of Dish' (the meal title), 'Calorie Amount' (calories per serving), 'Price of All Ingredients' (total cost of ingredients), 'Number of Servings' (servings yielded by the recipe), 'All Ingredients' (a list of ingredients with quantities), and 'List of Steps' (detailed cooking instructions). The recommendations should be nutritionally balanced, adhere to the specified dietary preferences (e.g., vegan, gluten-free, keto), and remain within the stated calorie and budget constraints, thereby supporting users in achieving their health and financial objectives through practical and affordable meal options.",
#         tools=[{"type": "code_interpreter"}],
#         model="gpt-4-turbo-preview"
#     )

assistant = client.beta.assistants.create(
    name="BudgetBod Assistant",
    instructions="You are BudgetBod, perfect for crafting meals that fit dietary needs, calorie goals, and budget. When given preferences, generate recipes that are 'dietary preference', 'calorie amount', 'budget amount'. Respond with a JSON-formatted message, providing exactly 3 meals that meet the criteria with in-depth info on the recipe. Each recipe should be a JSON object with keys 'Name of Dish', 'Calorie Amount', 'Price of All Ingredients', 'Number of Servings', 'All Ingredients', and 'List of Steps'.",
    tools=[{"type": "code_interpreter"}],
    model="gpt-4-turbo-preview"
)

# thread = client.beta.threads.create(
#         messages=[
#             {
#                 "role": "user",
#                 # Update this with the query you want to use.
#                 "content": "Generate recipes that are 'gluten-free', '1500 calories', '$15'?", 
#                 #content will be replaced with input from diff file probs
#             }
#         ]
#     )

thread = client.beta.threads.create(
    messages=[
        {
            "role": "user",
            "content": "Generate recipes that are 'gluten-free', '1500 calories total', with a budget of '$15' in total?", 
        }
    ]
)

app = Flask(__name__)

def processLLMResponse(response):
    try:
        response_json = json.loads(response.content[0].text.value)
        return response_json  
    except json.JSONDecodeError:
        print("The response is not in valid JSON format.")
        return None 


def generate_recipes(preferences):
    prompt = f"As BudgetBod, generate 3 meal recipes that are {preferences['dietaryRestrictions']}, approximately {preferences['calories']} calories, and cost under ${preferences['budget']}. Provide each recipe in JSON format with keys 'Name of Dish', 'Calorie Amount', 'Price of All Ingredients', 'Number of Servings', 'All Ingredients', and 'List of Steps'."

    try:
        response = openai.beta.assistants.run(thread.id, assistant, {
            messages: [{ "role": "user", "content": prompt }] 
        })

        generated_recipes = processLLMResponse(response)
        return json.dumps(generated_recipes) 

    except Exception as e:
        print(f"Error: {e}")
        return "Error generating recipes", 500 

# Example of how to use the backend (for testing)
if __name__ == '__main__':
    app.run(debug=True, port=5001)  
    test_preferences = {
        'goal': 'lose',
        'dietaryRestrictions': ['gluten-free'],
        'budget': 20,
        'calories': 1500
    }
    recipes = generate_recipes(test_preferences)
    print(recipes)


# Submit the thread to the assistant (as a new run).
run = client.beta.threads.runs.create(thread_id=thread.id, assistant_id=ASSISTANT_ID)
print(f"Run Created: {run.id}")

# Wait for run to complete.
while run.status != "completed":
        run = client.beta.threads.runs.retrieve(thread_id=thread.id, run_id=run.id)
        print(f"Run Status: {run.status}")
        time.sleep(10)
else:
    print(f"Run Completed!")

    # Get the latest message from the thread.
    message_response = client.beta.threads.messages.list(thread_id=thread.id)
    messages = message_response.data

    # Print the latest message.
    latest_message = messages[0]
    print(f"Response: {latest_message.content[0].text.value}")


# try:
#     response_json = json.loads(latest_message.content[0].text.value)
#     print(json.dumps(response_json, indent=4))
# except json.JSONDecodeError:
#     print("The response is not in valid JSON format.")
