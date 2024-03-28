import React from "react";
import './ChatContent.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

function ChatContent() {
    return(
        <>
            <div className="ChatContent-container">
                <div>
                    <p>ChatContent</p>
                </div>
                <div className="bottom-chat-input">
                    <div className="input-Container">
                        <textarea name="promptInput" placeholder="คุยกับ 1MAN&3GUY............." id="" ></textarea>
                        <FontAwesomeIcon icon={faPaperPlane} size="2xl" id="faPaperPlane"/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatContent