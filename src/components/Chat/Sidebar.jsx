import React from "react";
import './Sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faCirclePlus } from '@fortawesome/free-solid-svg-icons'

function Sidebar() {
    return(
        <>
            <div className="Sidebar-Container">
                <div className="Sidebar-grid">
                    <h3>1man&3guy</h3>
                    <div>
                        <button className="CreateChatBTN" onClick={""}><FontAwesomeIcon icon={faCirclePlus} size="xl"/>สร้างแชทใหม่</button>
                    </div>
                    <div className="ChatList-scroll">
                        <div className="ChatList">
                            <ChatButton chatname={"Start"} link={"testo"}/>
                            <ChatButton chatname={"Hello Testo 1234"} link={"testo1"}/>
                            <ChatButton chatname={"Hello Testo 1234"}/>
                            <ChatButton chatname={"Hello Testo 1234"}/>
                            <ChatButton chatname={"Hello Testo 1234"}/>
                            <ChatButton chatname={"Hello Testo 1234"}/>
                            <ChatButton chatname={"Hello Testo 1234"}/>
                            <ChatButton chatname={"Hello Testo 1234"}/>
                            <ChatButton chatname={"Hello Testo 1234"}/>
                            <ChatButton chatname={"Hello Testo 1234"}/>
                            <ChatButton chatname={"Hello Testo 1234"}/>
                            <ChatButton chatname={"Hello Testo 1234"}/>
                            <ChatButton chatname={"Hello Testo 1234"}/>
                            <ChatButton chatname={"Hello Testo 1234"}/>
                            <ChatButton chatname={"Hello Testo 1234"}/>
                            <ChatButton chatname={"Hello Testo 1234"}/>
                            <ChatButton chatname={"Hello Testo 1234"}/>
                            <ChatButton chatname={"Hello Testo 1234"}/>
                            <ChatButton chatname={"Hello Testo 1234"}/>
                            <ChatButton chatname={"Hello Testo 1234"}/>
                            <ChatButton chatname={"Hello Testo 1234"}/>
                            <ChatButton chatname={"Hello Testo 1234"}/>
                            <ChatButton chatname={"Hello Testo 1234"}/>
                            <ChatButton chatname={"Hello Testo 1234"}/>
                            <ChatButton chatname={"Hello Testo 1234"}/>
                            <ChatButton chatname={"Hello Testo 1234"}/>
                            <ChatButton chatname={"Hello Testo 1234"}/>
                            <ChatButton chatname={"Hello Testo 1234"}/>
                            <ChatButton chatname={"Hello Testo 1234"}/>
                            <ChatButton chatname={"End"}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function ChatButton({chatname, link}){
    return(
        <>
            <div className="ChatButton-container">
                <a href={link}>{chatname}</a>
                <div className="Chat-Setting"><FontAwesomeIcon icon={faEllipsis} size="lg" id="faEllipsis"/></div>
            </div>
        </>
    )
}

export default Sidebar