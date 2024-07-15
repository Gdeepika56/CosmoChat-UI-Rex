import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './chat.css';

const API_KEY = "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";

const Chat = ({ onChatEnd }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        // Initialize chat session or load existing chat history if needed
        setMessages([{ text: "Hello, I am Chatbox!", sender: 'bot' }]);
    }, []);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessage = { text: input, sender: 'user' };
        setMessages([...messages, newMessage]);
        setInput('');

        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: input }]
                },
                {
                    headers: {
                        'Authorization': `Bearer ${API_KEY}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            const botMessage = { text: response.data.choices[0].message.content, sender: 'bot' };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const endChat = () => {
        // Perform any necessary cleanup or termination actions
        onChatEnd();
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message here..."
                />
                <button onClick={sendMessage}>Send</button>
                <button onClick={endChat}>End Chat</button>
            </div>
        </div>
    );
};

export default Chat;
