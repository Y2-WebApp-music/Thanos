import React, { useRef, useEffect, useState } from "react";
import './ChatContent.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { auth, db } from '/src/DB/firebase-config.js'
import {addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy} from 'firebase/firestore'


function ChatContent() {
    const textareaRef = useRef(null);
    const [newMessage, setNewMessage] = useState("")
    const messagesRef = collection(db, "messages")
    const [messages, setMessages] = useState([]);

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

    useEffect(()=>{
        const queryMessage = query(messagesRef, orderBy("TimeAt", "asc"))
        onSnapshot(queryMessage, (snapshot)=>{
            let messages = [];
            snapshot.forEach((doc)=>{
                messages.push({ ...doc.data(), id:doc.id});
            })
            setMessages(messages);
            autoExpand();
        })
    }, [])

    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(newMessage)
        if (newMessage === "")return;

        await addDoc(messagesRef, {
            text: newMessage,
            TimeAt: serverTimestamp(),
            user: auth.currentUser.displayName
        });
        setNewMessage("")
        autoExpand();
    }
    return(
        <>
            <div className="ChatContent-container">
                <div className="chat-container-scroll">
                    <div className="chat-container">
                        {messages.map((messages)=>(
                            messages.user === "model"?(
                                <ModelChat text={messages.text}/>
                            ) : (
                                <UserChat text={messages.text} user={messages.user} photoURL={auth.currentUser.photoURL}/>
                            ))
                        )}
                    </div>
                </div>
                <div className="bottom-chat-input">
                    <form action="" onSubmit={handleSubmit} className="input-Container">
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