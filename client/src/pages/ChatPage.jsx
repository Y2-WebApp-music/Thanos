import React, { useState } from "react";
import './ChatPage.css'

import ChatContent from '../components/Chat/ChatContent'
import Namechat from '../components/Chat/Namechat'
import Sidebar from '../components/Chat/Sidebar'

function ChatPage() {
    const [chatId, setChatId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [chatSelect, setChatSelect] = useState(null);
    const [messages, setMessages] = useState(null);
    const [ListText, setListText] = useState([]);

    const handleChatButtonClick = (chatId, userId) => {
        setChatId(chatId);
        setUserId(userId);
        LoadMessages(chatId, setMessages, setListText)
        console.log('ChatPage Get chatId:',chatId)
        console.log('ChatPage Get userId:',userId)
    };
    const handleSelectChat = (chatSelect)=>{
        setChatSelect(chatSelect)
    }

    return(
        <>
            <div className="Chat-Container">
                <div>
                    <Sidebar onChatButtonClick={handleChatButtonClick} chatSelect={chatSelect}/>
                </div>
                <div className="Chat-Container-grid">
                    <Namechat/>
                    <ChatContent ChatroomID={chatId} UserCurrent={userId} ChatSelect={handleSelectChat} messages={messages} setMessages={setMessages} ListText={ListText} setListText={setListText}/>
                </div>
            </div>
        </>
    )
}

function LoadMessages( chatId, setMessages, setListText){
    let retryCount = 0;
    const maxRetries = 3;
    const fetchMessages = async () => {
        try {
            const response = await fetch(`http://localhost:3100/messages?chatId=${chatId}`);
            const Messages = await response.json();
            console.log('GET Messages ',Messages)
            if (Object.keys(Messages).length === 0 && Messages.constructor === Object) {
                console.log("Messages is empty. Retrying...");
                retryCount++;
                if (retryCount <= maxRetries) {
                    setTimeout(fetchMessages, 1000);
                } else {
                    console.log("Max retries exceeded. Unable to fetch chat.");
                }
            } else {
                setMessages(Messages[0]);
                setListText(Messages[0].messages)
            }
        } catch (error) {
            console.error('Error fetching chat:', error);
            setTimeout(fetchMessages, 1000);
        }
    };
    fetchMessages();
}

export default ChatPage