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
    const [loadRoom, setLoadRoom] = useState(false)
    const [loadMes, setLoadMes] = useState(false)
    const [sidebar, setSidebar] = useState(false)

    const handleChatButtonClick = (chatId, userId) => {
        setChatId(chatId);
        setUserId(userId);
        if (chatId === null && userId === null){
            setMessages(null)
        } else {
            LoadMessages(chatId, userId, setMessages, setLoadMes)
        }
        console.log('ChatPage Get chatId:',chatId)
        console.log('ChatPage Get userId:',userId)
    };
    const handleSelectChat = (chatSelect)=>{
        setChatSelect(chatSelect)
    }

    return(
        <>
            <div className="Chat-Container">
                <Sidebar onChatButtonClick={handleChatButtonClick} chatId={chatId} chatList={chatList} setChatList={setChatList} chatSelect={chatSelect} LoadChat={LoadChat} setLoadRoom={setLoadRoom} loadRoom={loadRoom} sidebar={sidebar} setSidebar={setSidebar}/>
                <div className="Chat-Container-grid">
                    <Namechat setSidebar={setSidebar} sidebar={sidebar}/>
                    <ChatContent loadMes={loadMes} LoadChat={LoadChat} onChatButtonClick={handleChatButtonClick} setChatList={setChatList} chatId={chatId} UserCurrent={userId} ChatSelect={handleSelectChat} messages={messages} setMessages={setMessages} setLoadRoom={setLoadRoom}/>
                </div>
            </div>
        </>
    )
}

function LoadChat( userId, setChatList, setLoadRoom){
    let retryCount = 0;
    const maxRetries = 3;
    setLoadRoom(true)
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
                setLoadRoom(false)
                setChatList(Chats);
            }
        } catch (error) {
            console.error('Error fetching chat:', error);
            setTimeout(fetchChats, 1000);
        }
    };
    fetchChats();
}
function LoadMessages( chatId, userId, setMessages, setLoadMes){
    let retryCount = 0;
    const maxRetries = 3;
    setLoadMes(true)
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
                setLoadMes(false)
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