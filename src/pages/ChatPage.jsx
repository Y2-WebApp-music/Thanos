import React, { useState } from "react";
import './ChatPage.css'

import ChatContent from '../components/Chat/ChatContent'
import Namechat from '../components/Chat/Namechat'
import Sidebar from '../components/Chat/Sidebar'

function ChatPage() {
    const [chatId, setChatId] = useState(null);

    const handleChatButtonClick = (chatId) => {
        setChatId(chatId);
    };

    return(
        <>
            <div className="Chat-Container">
                <div>
                    <Sidebar onChatButtonClick={handleChatButtonClick}/>
                </div>
                <div className="Chat-Container-grid">
                    <Namechat/>
                    <ChatContent chatId={chatId} />
                </div>
            </div>
        </>
    )
}

export default ChatPage