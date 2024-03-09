from flask import Flask, jsonify, request
from flask_cors import CORS
from Google_gemini import get_gemini_pro_response
from Youtube import extract_transcript_details, get_video_title
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)


client = MongoClient('mongodb://localhost:27017')
db = client['Youtube']
collection = db['user_history']
user_collection = db['userdata']

@app.route("/youtube_summary", methods=['POST'])
def generate_summary():
    try:
        username = request.args.get('username')
        
        data = request.json
        youtube_video_url = data.get('youtube_url')
        transcript_text, thumbnail_url = extract_transcript_details(youtube_video_url)
        video_title = get_video_title(youtube_video_url)

        prompt = """
            You are youtube video summarizer. You will be taking the transcript text and summarizing the entire video and providing
            the important summary in points within 250 words. Please provide the summary of the text given here.
        """
        final_prompt = transcript_text + prompt
        response = get_gemini_pro_response(final_prompt)

        history = {
            'username': username,
            'Title': video_title,
            'Thumbnail': thumbnail_url,
            'Summary': response
        }
        collection.insert_one(history)

        return jsonify({"response": response, "thumbnail_url": thumbnail_url, "video_title": video_title})

    except Exception as e:
        return jsonify({"error": str(e)})


@app.route("/chat_history", methods=['GET'])
def get_chat_history():
    try:
        username = request.args.get('username')
        chat_history = list(collection.find({'username': username}, {'_id': 0}))
        return jsonify(chat_history)

    except Exception as e:
        return jsonify({"error": str(e)})


@app.route("/login", methods=['POST'])
def login():
    try:
        data = request.json
        username = data.get('username')
        password = data.get('password')

        user = user_collection.find_one({'username': username, 'password': password})
        if user:
            return jsonify({"message": "Success"}), 200
        else:
            return jsonify({"message": "Invalid username or password"}), 401

    except Exception as e:
        return jsonify({"error": str(e)})


@app.route("/register", methods=['POST'])
def register():
    try:
        data = request.json
        name = data.get('Name')
        username = data.get('username')
        password = data.get('password')

        if user_collection.find_one({'username': username}):
            return jsonify({"message": 'Exists'}), 400

        new_user = {
            'Name': name,
            'username': username,
            'password': password
        }    

        user_collection.insert_one(new_user)

        return jsonify({"message": 'Success'}), 201

    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == "__main__":
    app.run(host='192.168.111.31', port = 5000,debug=True)
