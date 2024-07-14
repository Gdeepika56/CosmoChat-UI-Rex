import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import Chat from './pages/chat';
import ActivityDashboard from './pages/ActivityDashboard';

const theme = createTheme();

function App() {
  const [view, setView] = useState('landing');

  const startChat = () => {
    setView('chat');
  };

  const showDashboard = () => {
    setView('dashboard');
  };

  const handleChatEnd = () => {
    setView('landing');
  };

  const handleBackToLanding = () => {
    setView('landing');
  };


  return (
    <ThemeProvider theme={theme}>
      <div className="App">
      {view === 'landing' && (
    <div className="landing-page">
      <h1 className="welcome-heading">Welcome to Chat Service</h1>
      <div className="button-container">
        <button className="landing-button" onClick={startChat}>Start Chat</button>
        <button className="landing-button" onClick={showDashboard}>View Dashboard</button>
      </div>
    </div>
  )}
        {view === 'chat' && <Chat onChatEnd={handleChatEnd} />}
        {view === 'dashboard' && <ActivityDashboard onBack={handleBackToLanding} />}
      </div>
    </ThemeProvider>
  );
}

export default App;
