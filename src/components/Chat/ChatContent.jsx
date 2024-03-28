import React, { useRef, useEffect } from "react";
import './ChatContent.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

function ChatContent() {
    const textareaRef = useRef(null);

    useEffect(() => {
        autoExpand();
    }, []);

    const autoExpand = () => {
        const textarea = textareaRef.current;
        textarea.style.height = '1.5em';
        textarea.style.height = Math.min(textarea.scrollHeight, 170) + 'px';
    };

    const handleChange = () => {
        autoExpand();
    };
    return(
        <>
            <div className="ChatContent-container">
                <div>
                    <p>ChatContent</p>
                </div>
                <div className="bottom-chat-input">
                    <div className="input-Container">
                        <textarea ref={textareaRef} name="promptInput" placeholder="คุยกับ 1MAN&3GUY............." id=""  onChange={handleChange}></textarea>
                        <FontAwesomeIcon icon={faPaperPlane} size="2xl" id="faPaperPlane"/>
                    </div>
                </div>
            </div>
        </>
    )
}

function userChat() {
    return(
        <>
        </>
    )
}

export default ChatContent