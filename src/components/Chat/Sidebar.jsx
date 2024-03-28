import React from "react";
import './Sidebar.css'

function Sidebar() {
    return(
        <>
            <div className="Sidebar-Container">
                <div className="Sidebar-grid">
                    <h3>1man&3guy</h3>
                    <div>
                        <button>สร้างแชทใหม่</button>
                    </div>
                    <div className="ChatList">
                        <ChatButton chatname={"Hello Testo 1234"}/>
                        <ChatButton chatname={"Hello Testo 1234"}/>
                        <ChatButton chatname={"Hello Testo 1234"}/>
                        <ChatButton chatname={"Hello Testo 1234"}/>
                        <ChatButton chatname={"Hello Testo 1234"}/>
                        <ChatButton chatname={"Hello Testo 1234"}/>
                    </div>
                </div>
            </div>
        </>
    )
}

function ChatButton({chatname}){
    return(
        <>
            <div className="ChatButton-container">
                <p>{chatname}</p>
                <div></div>
            </div>
        </>
    )
}

export default Sidebar