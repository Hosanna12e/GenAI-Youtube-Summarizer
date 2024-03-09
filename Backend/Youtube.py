from youtube_transcript_api import YouTubeTranscriptApi
from urllib.parse import urlparse, parse_qs
import requests
from bs4 import BeautifulSoup

def extract_transcript_details(youtube_video_url):
    try:
        parsed_url = urlparse(youtube_video_url)
        video_id = parse_qs(parsed_url.query).get('v')[0]
        transcript_text = YouTubeTranscriptApi.get_transcript(video_id)
        transcript = " ".join([i["text"] for i in transcript_text])
        thumbnail_url = f"http://img.youtube.com/vi/{video_id}/0.jpg"
        return transcript, thumbnail_url
    except Exception as e:
        raise e

def get_video_title(youtube_video_url):
    try:
        response = requests.get(youtube_video_url)
        soup = BeautifulSoup(response.text, 'html.parser')
        title = soup.find('title').get_text()
        return title
    except Exception as e:
        raise e
