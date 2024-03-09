import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';

const Chat_history = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const username = sessionStorage.getItem('username');

  useEffect(() => {
    fetchChatHistory();
    const intervalId = setInterval(fetchChatHistory, 1000);
    return () => {
      clearInterval(intervalId); 
    };
  }, []);

  const fetchChatHistory = () => {
    fetch(`http:// 192.168.111.31:5000/chat_history?username=${username}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          const reversedChatHistory = data.reverse();
          setChatHistory(reversedChatHistory);
        } else {
          console.error('Unexpected response format:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching chat history:', error);
      });
  };

  return (
    <div>
      <h2>Chat History:</h2>
      <ul>
        {chatHistory.map((chat, index) => (
          <Container key={index} sx={{ bgcolor: '#cfe8fc', marginTop: 2, padding: 2 }}>
          <li key={index}>
            <strong>{chat.Title}: <br />
            <img src={chat.Thumbnail} alt="Thumbnail" style={{ maxWidth: '100px', maxHeight: '100px' }} />
            <br /> </strong> {chat.Summary} 
            </li>
          </Container>
        ))}
      </ul>
    </div>
  );
};

export default Chat_history;
