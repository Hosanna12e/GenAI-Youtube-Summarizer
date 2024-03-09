from dotenv import load_dotenv
import os
import google.generativeai as genAi 

load_dotenv()

apiKey = os.getenv("GEMINI_API_KEY")

genAi.configure(api_key = apiKey)

def get_gemini_pro_response(input):
    model = genAi.GenerativeModel("gemini-pro")
    resp = model.generate_content(input)
    return resp.text