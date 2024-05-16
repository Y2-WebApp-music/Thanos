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
    const [chatList, setChatList] = useState([])

    const handleChatButtonClick = (chatId, userId) => {
        setChatId(chatId);
        setUserId(userId);
        LoadMessages(chatId, userId, setMessages)
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
                    <Sidebar onChatButtonClick={handleChatButtonClick} chatList={chatList} setChatList={setChatList} chatSelect={chatSelect} LoadChat={LoadChat}/>
                </div>
                <div className="Chat-Container-grid">
                    <Namechat/>
                    <ChatContent LoadChat={LoadChat} onChatButtonClick={handleChatButtonClick} setChatList={setChatList} chatId={chatId} UserCurrent={userId} ChatSelect={handleSelectChat} messages={messages} setMessages={setMessages} />
                </div>
            </div>
        </>
    )
}

function LoadChat( userId, setChatList  ){
    let retryCount = 0;
    const maxRetries = 3;
    const fetchChats = async () => {
        try {
            const response = await fetch(`http://localhost:3100/chatroom?uid=${userId}`);
            const Chats = await response.json();
            console.log('GET Chats ',Chats)
            if (Object.keys(Chats).length === 0 && Chats.constructor === Object) {
                console.log("Chats is empty. Retrying...");
                retryCount++;
                if (retryCount <= maxRetries) {
                    setTimeout(fetchChats, 1000);
                } else {
                    console.log("Max retries exceeded. Unable to fetch chat.");
                }
            } else {
                setChatList(Chats);
            }
        } catch (error) {
            console.error('Error fetching chat:', error);
            setTimeout(fetchChats, 1000);
        }
    };
    fetchChats();
}
function LoadMessages( chatId, userId, setMessages){
    let retryCount = 0;
    const maxRetries = 3;
    const fetchMessages = async () => {
        try {
            const response = await fetch(`http://localhost:3100/messages?id=${chatId}&&uid=${userId}`);
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
                setMessages(Messages);
            }
        } catch (error) {
            console.error('Error fetching chat:', error);
            setTimeout(fetchMessages, 1000);
        }
    };
    fetchMessages();
}

export default ChatPage