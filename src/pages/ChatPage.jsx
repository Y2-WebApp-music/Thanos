import React, { useState } from "react";
import './ChatPage.css'

import ChatContent from '../components/Chat/ChatContent'
import Namechat from '../components/Chat/Namechat'
import Sidebar from '../components/Chat/Sidebar'

function ChatPage() {
    const [chatId, setChatId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [chatSelect, setChatSelect] = useState(null);

    const handleChatButtonClick = (chatId, userId) => {
        setChatId(chatId);
        setUserId(userId);
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
                    <ChatContent ChatroomID={chatId} UserCurrent={userId} ChatSelect={handleSelectChat}/>
                </div>
            </div>
        </>
    )
}

export default ChatPage