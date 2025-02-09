from flask import Flask, request, jsonify,send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
from langchain.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from astrapy import DataAPIClient
import os
import json
import re

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__,static_folder='../client/dist', static_url_path='')
CORS(app)

# Initialize Astra DB client
client = DataAPIClient(os.getenv('ASTRADB'))
db = client.get_database_by_api_endpoint(os.getenv('ENDPOINT'))

# Initialize OpenAI model
def get_llm():
    print(os.getenv('OPENAIKEY'))
    return ChatOpenAI(model="gpt-4o-mini", api_key=os.getenv('OPENAIKEY'))
    
# Helper function to process AI prompts
def process_prompt(template, input_data):
    prompt = PromptTemplate(template=template, input_variables=["horoscope"])
    llm = get_llm()
    chain = prompt | llm
    response = chain.invoke(input={"horoscope": input_data})
    response_content = response.content
    print(response.content)
    insights = re.sub(r"```json|```", "", response_content)
    return json.loads(insights)

def process_query(template, data):
    prompt = PromptTemplate(template=template, input_variables=["data"])
    llm = get_llm()
    chain = prompt | llm
    response = chain.invoke(input={"data": data})
    print(response)
    response_content = response.content
    print(response.content)
    insights = re.sub(r"```json|```", "", response_content)
    return json.loads(insights)
@app.route('/')
def serve():
    # Serve the index.html for any route not found on the server
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/details')
def serve_details():
    # Serve the index.html for any route not found on the server
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/insights', methods=['POST'])
def send_insights():
    data = request.get_json()
    prompt_template = """
        Generate concise astrological insights in JSON format based on a given horoscope {horoscope}.
        Provide one paragraph for each of the following aspects: career, relationships, personal growth, family, and social connections in the json format

            "career": "",
            "relationships": "",
            "personal_growth": "",
            "family": "",
            "social_connections": ""

        Each paragraph should be focused, comprehensive, and use astrological references from the horoscope to explain the personality or life aspect. Use clear and precise language, ensuring relevance and brevity. Return the result as a JSON object with keys for each aspect.
        Note: Only generate the insights in specified format, do not include any explanations or additional information.
    """

    try:
        insights = process_prompt(prompt_template, data)
        return jsonify({"filterData": insights, 'msg': 1})
    except Exception as e:
        return jsonify({"msg": str(e), "error_type": type(e).__name__}), 500

@app.route('/gems', methods=['POST'])
def send_gems():
    data = request.get_json()
    prompt_template = """
        Generate puja suggestions based on the following birth details and planetary combinations. The output should be in JSON format, similar to the example provided, including a summary, a list of puja suggestions with their status, priority, title, puja ID, detailed summary, and a one-line explanation. Ensure the data reflects the astrological interpretations for the given inputs.
        {horoscope}
        Create the following output

            "summary": <In one paragraph>,
            "suggestions": [
                
                    "status": ,
                    "priority": ,
                    "title": "",
                    "puja_id": "",
                    "summary": "",
                    "one_line": ""
                ,
                
                    "status": ,
                    "priority": ,
                    "title": "",
                    "puja_id": "",
                    "summary": "",
                    "one_line": ""
                
            ],
            "dos": [List of Do's],
            "donts": [List of Don'ts]
    """

    try:
        suggestions = process_prompt(prompt_template, data)
        print(suggestions)
        return jsonify({"filterData": suggestions, 'msg': 1})
    except Exception as e:
        return jsonify({"msg": str(e), "error_type": type(e).__name__}), 500

@app.route('/spiritualContent', methods=['POST'])
def send_content():
    data = request.get_json()
    prompt_template = """
        Create JSON data based on horoscope {horoscope} that includes meditation sessions, workout routines, and sleep content. Each category should have the following details:

        "Meditation":
            "title": <A descriptive name for the meditation session>,
            "description": <A brief overview of what the meditation entails>,
            "duration": <The length of the meditation, e.g., "15 minutes">,
            "goalAlignment": <The intended benefit of the session, e.g., "mindfulness">
        ,
        "Workouts":
            "title": <A descriptive name for the workout>,
            "description": <A brief overview of the workout's focus>,
            "duration": <The length of the workout, e.g., "30 minutes>,
            "intensityLevel": <The level of difficulty, e.g., "low", "moderate", or "high">
        ,
        "Sleep Content":
            "title": <A descriptive name for the sleep content>,
            "description": <A brief overview of the sleep content's purpose>,
            "audioFile": <A URL to the associated audio file>,
            "duration": <The length of the sleep content, e.g., "45 minutes">,
            "focus": <The specific area it targets, e.g., "insomnia" or "deep sleep">
        Note: Do not include any additional information or explanations in the output. Only provide the data in the JSON format.
    """

    try:
        suggestions = process_prompt(prompt_template, data)
        print(suggestions)
        return jsonify({"filterData": suggestions, 'msg': 1})
    except Exception as e:
        return jsonify({"msg": str(e), "error_type": type(e).__name__}), 500

@app.route('/chatbot', methods=['POST'])
def chatbot():
    data = request.get_json()
    print(data)
    prompt_template = """
        This is context and query in the JSON format <{data}> give the answer in the JSON format to the query in the JSON format.
        "answer":
            <response to the user query in one paragraph>
        Note: Do not include any additional information or explanations in the output. Only provide the data in the JSON format.
    """

    try:
        suggestions = process_query(prompt_template, data)
        print(suggestions)
        return jsonify({"filterData": suggestions, 'msg': 1})
    except Exception as e:
        return jsonify({"msg": str(e), "error_type": type(e).__name__}), 500

if __name__ == '__main__':
  app.run(host="0.0.0.0", port=5000)
