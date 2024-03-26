from flask import Flask, request, jsonify
# from flask_cors import CORS
import openai

app = Flask(__name__)
# CORS(app)  # Enable CORS


@app.route('/generate-recipes', methods=['POST'])
def generate_recipes():
    data = request.json
    dietary_preference = data['dietary_preference']
    calorie_amount = data['calorie_amount']
    budget_amount = data['budget_amount']

    prompt = f"Generate recipes that are '{dietary_preference}', '{calorie_amount}', '{budget_amount}'?"

    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        temperature=0.5,
        max_tokens=500,
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=0.0
    )

    # Assuming the response from OpenAI is text and needs to be parsed
    recipes_text = response.choices[0].text.strip()
    recipes_list = recipes_text.split("\n\n")  # Example parsing, adjust based on actual response format

    return jsonify({"recipes": recipes_list})

if __name__ == '__main__':
    app.run(debug=True)
