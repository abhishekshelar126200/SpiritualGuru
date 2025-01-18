from astrapy import DataAPIClient
from langchain_openai import OpenAI  # Correct import statement for OpenAI
from langchain.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import json
import re
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize the Astra DB client
client = DataAPIClient(os.getenv('ASTRADB'))
db = client.get_database_by_api_endpoint(
    os.getenv('ENDPOINT')
)

data = {
    "ascendant": "Leo",
    "Varna": "Vaishya",
    "Vashya": "Maanav",
    "Yoni": "Gau",
    "Gan": "Manushya",
    "Nadi": "Adi",
    "SignLord": "Mercury",
    "sign": "Virgo",
    "Naksahtra": "Uttra Phalguni",
    "NaksahtraLord": "Sun",
    "Charan": 3,
    "Yog": "Vaidhriti",
    "Karan": "Kaulav",
    "Tithi": "Krishna Dwadashi",
    "yunja": "Madhya",
    "tatva": "Earth",
    "name_alphabet": "Pa",
    "paya": "Silver"
}

@app.route('/insights', methods=['GET', 'POST'])
def sendInsights():
    prompt = PromptTemplate(
        template="""
        Generate concise astrological insights in JSON format based on a given horoscope {horoscope}.
        Provide one paragraph for each of the following aspects: career, relationships, personal growth, family, and social connections in the json format
        
            "career": "",
            "relationships": "",
            "personal_growth": "",
            "family": "",
            "social_connections": ""
         
        Each paragraph should be focused, comprehensive, and use astrological references from the horoscope to explain the personality or life aspect. Use clear and precise language, ensuring relevance and brevity. Return the result as a JSON object with keys for each aspect.
        Note: Only generate the insights in specified format, do not include any explanations or additional information.
        """,
        input_variables=["horoscope"]
    )

    # Initialize the OpenAI model
    llm = ChatOpenAI(model="gpt-4o-mini", api_key=os.getenv('OPENAIKEY'))  # Use the correct model name for OpenAI GPT-4
    print(os.getenv('OPENAIKEY'))
    # Chain the prompt and LLM
    chain = prompt | llm

    try:
        # Get response from the chain
        print(data)
        response = chain.invoke(input={"horoscope": data})

        response_content = response.content  # Extract content of the AI message
        print(response_content)
        insights = re.sub(r"```json|```", "", response_content)

        # Return the response as JSON
        return jsonify({"filterData": json.loads(insights), 'msg': 1})
    except Exception as e:
        # Return error message in a JSON-friendly format
        return jsonify({"msg": str(e), "error_type": type(e).__name__}), 500


if __name__ == '__main__':
    app.run(debug=True)
