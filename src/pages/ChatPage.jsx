import React from "react";
import './ChatPage.css'

import ChatContent from '../components/Chat/ChatContent'
import Namechat from '../components/Chat/Namechat'
import Sidebar from '../components/Chat/Sidebar'

function ChatPage() {
    return(
        <>
            <div className="Chat-Container">
                <div>
                    <Sidebar/>
                </div>
                <div className="Chat-Container-grid">
                    < Namechat/>
                    < ChatContent/>
                </div>
            </div>
        </>
    )
}

export default ChatPage