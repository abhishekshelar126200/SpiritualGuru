from flask import Flask, request, jsonify
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
app = Flask(__name__)
CORS(app)

# Initialize Astra DB client
client = DataAPIClient(os.getenv('ASTRADB'))
db = client.get_database_by_api_endpoint(os.getenv('ENDPOINT'))

# Initialize OpenAI model
def get_llm():
    return ChatOpenAI(model="gpt-4o-mini", api_key=os.getenv('OPENAIKEY'))

# Helper function to process AI prompts
def process_prompt(template, input_data):
    prompt = PromptTemplate(template=template, input_variables=["horoscope"])
    llm = get_llm()
    chain = prompt | llm
    response = chain.invoke(input={"horoscope": input_data})
    response_content = response.content
    insights = re.sub(r"```json|```", "", response_content)
    return json.loads(insights)

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
            "summary": "",
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
            "Do's": [List of Do's],
            "Dont's": [List of Don'ts]
    """

    try:
        suggestions = process_prompt(prompt_template, data)
        return jsonify({"filterData": suggestions, 'msg': 1})
    except Exception as e:
        return jsonify({"msg": str(e), "error_type": type(e).__name__}), 500


if __name__ == '__main__':
  app.run(host="0.0.0.0", port=5000)
