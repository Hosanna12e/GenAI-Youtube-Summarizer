import React, { useState } from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';

const YoutubeSummarizer = () => {

  const username = sessionStorage.getItem('username');

  const [summary, setSummary] = useState('');
  const [thumbnailURL, setThumbnailURL] = useState('');
  const [youtubeURL, setYoutubeURL] = useState('');
  const [videoTitle, setVideoTitle] = useState('');

  const handleSummarize = () => {
    fetch(`http://192.168.111.31:5000/youtube_summary?username=${username}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ youtube_url: youtubeURL }),
    })
        .then(response => response.json())
        .then(data => {
            setSummary(data.response);
            setThumbnailURL(data.thumbnail_url);
            setVideoTitle(data.video_title); 
            console.log(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
  };

  const handleInputChange = (event) => {
    setYoutubeURL(event.target.value);
  };

  return (
    <div>
      <TextField id="outlined-basic" label="Enter YouTube video URL" variant="outlined" onChange={handleInputChange} />
      <br /><br />
      <Button onClick={handleSummarize} variant="contained" endIcon={<SendIcon />}>
        Summarize
      </Button>
      <br /><br />
      <h2>Video Title: {videoTitle}</h2>
      <img src={thumbnailURL} alt="Video Thumbnail" />
      <h2>Summary:</h2>
      <p>{summary}</p>
    </div>
  );
};

export default YoutubeSummarizer;
