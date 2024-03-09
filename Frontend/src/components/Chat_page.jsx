import React from 'react';
import YoutubeSummarizer from './Youtube_Summarizer';
import Chat_history from './Chat_history';
import '../index.css';
import { NavLink, useNavigate } from "react-router-dom"
import Button from '@mui/material/Button';

const Chat_page = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('username'); 
    navigate("/login");
  };

  return (
    <div className="chat-page-container">
      <div className="left-column" style={{ height: 'calc(100vh - 64px)', overflow: 'auto' }}>
        <Chat_history />
      </div>
      <div className="right-column" style={{ height: 'calc(100vh - 64px)', overflow: 'auto' }}>
        <Button variant="outlined" component={NavLink} to="/" style={{ textDecoration: 'none' }} onClick={handleLogout}>Logout</Button>
        <br /><br />
        <YoutubeSummarizer />
      </div>
    </div>
  );
};

export default Chat_page;
