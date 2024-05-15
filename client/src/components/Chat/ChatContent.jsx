import React, { useRef, useEffect, useState } from "react";
import './ChatContent.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { auth, db } from '/src/DB/firebase-config.js'
import {addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy} from 'firebase/firestore'


function ChatContent({ ChatroomID, UserCurrent, ChatSelect, messages, ListText, setListText}) {
    const [chatId, setChatId] = useState(ChatroomID)
    const [UserId, setUserId] = useState(UserCurrent)
    useEffect(() => {
        setChatId(ChatroomID);
        setUserId(UserCurrent);
    }, [ChatroomID])

    const textareaRef = useRef(null);
    const chatContainerRef = useRef(null);
    const [newMessage, setNewMessage] = useState("")
    const messagesRef = collection(db, "messages")

    const autoExpand = () => {
        const textarea = textareaRef.current;
        textarea.style.height = '1.5em';
        textarea.style.height = Math.min(textarea.scrollHeight, 170) + 'px';
    };

    const handleChange = () => {
        autoExpand();
    };

    const handleKey = e=>{
        e.code === "Enter" && handleSubmit()
    }

    const chatRef = collection(db, "chatroom")

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (newMessage === "")return;
        if (chatId === null ){
            try {
                // let newChatRef = {id:37485698345 , chatname:"FromChatContent", userId:"BLHJRV489giuLGRIU24"}
                const  newChatRef = await addDoc(chatRef, {
                    chatname: "newChatRoom",
                    TimeAdd: serverTimestamp(),
                    userId: auth.currentUser.uid
                });
                setChatId(newChatRef.id);
                setUserId(auth.currentUser.uid);
                await addDoc(messagesRef, {
                    chatId: newChatRef.id,
                    text: newMessage,
                    TimeAt: serverTimestamp(),
                    userId: auth.currentUser.uid
                });
                ChatSelect(newChatRef.id)
                setNewMessage("")
                autoExpand();
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        }else{
            let send
            if (ListText === null){
                setListText([{who: 'user', text: newMessage}])
                send = [{who: 'user', text: newMessage}]
            } else {
                setListText([...ListText, {who: 'user', text: newMessage}])
                send = [...ListText, {who: 'user', text: newMessage}]
            }
            await fetch(`http://localhost:3100/addMessages?id=${messages._id}&chatId=${chatId}&document=${send}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(send)
            }).then(
                setNewMessage(""),
                autoExpand()
            )
        }
    }

    useEffect(() => {
        autoExpand();
    }, []);

    return(
        <>
            <div className="ChatContent-container">
                <div className="chat-container-scroll">
                    <div className="chat-container-Empty" ref={chatContainerRef}>
                        {chatId === null || ListText === null?(
                            <>
                            <div className="NewChat-Container">
                                <h1>How can I help you?</h1>
                            </div>
                            </>
                        ):(
                            <div className="chat-container">
                                {ListText.map((message,index) => (
                                    message.who === "model" ? (
                                        <ModelChat key={index} text={message.text} />
                                    ) : (
                                        <UserChat key={index} text={message.text} user={auth.currentUser.displayName} photoURL={auth.currentUser.photoURL} />
                                    )
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="bottom-chat-input">
                    <form action="" onSubmit={handleSubmit} onKeyDown={handleKey} className="input-Container">
                        <textarea ref={textareaRef}
                            name="promptInput"
                            placeholder="คุยกับ 1MAN&3GUY............." id=""
                            onChange={(e) => {handleChange(e); setNewMessage(e.target.value);}}
                            value={newMessage}
                        ></textarea>
                        <button type="submit"> <FontAwesomeIcon icon={faPaperPlane} size="xl" id="faPaperPlane"/> </button>
                    </form>
                </div>
            </div>
        </>
    )
}

function UserChat({ text,user, photoURL }) {
    return (
        <>
            <div className="UserChat-Container">
                <div className="UserChat-Container-Profile">
                    <p>{user}</p>
                    <img src={photoURL} alt="" />
                </div>
                <p className="UserChat-text">{text}</p>
            </div>
        </>
    );
}

function ModelChat({ text }) {
    return (
        <>
        <div className="ModelChat-Container">
            <div className="ModelChat-Container-Profile">
                <img src="public/images/ModelPicture.jpg" alt="" />
                <p>1man&3guy</p>
            </div>
            <p className="ModelChat-text">{text}</p>
        </div>
        </>
    );
}

export default ChatContent