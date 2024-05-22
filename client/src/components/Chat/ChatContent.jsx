import React, { useRef, useEffect, useState } from "react";
import './ChatContent.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { auth } from '/src/DB/firebase-config.js'
import ModelSkeleton from "../Loading/ModelWait";
import axios from 'axios';
import Papa from 'papaparse';


function ChatContent({LoadChat, onChatButtonClick, setChatList, chatId ,UserCurrent, ChatSelect, messages}) {
    const [ListText, setListText] = useState(null)
    const [userId, setUserID] = useState(UserCurrent)
    const [loading, setLoading] = useState(false);
    const textareaRef = useRef(null);
    const chatContainerRef = useRef(null);
    const [newMessage, setNewMessage] = useState("")
    const [csvData, setCsvData] = useState([]);

    useEffect(() => {
        if (csvData != []) {
            fetch('/src/constant/civil-and-commercial-datasets.csv')
                .then(response => response.text())
                .then(csvText => {
                Papa.parse(csvText, {
                    header: true,
                    complete: (results) => {
                    const data = {};
                    results.data.forEach(item => {
                        data[item.article] = item.text;
                    });
                    setCsvData(data);
                    },
                });
            });
        }
        console.log('csvData use')
    }, [userId]);

    useEffect(() => {
        setListText(messages ? messages.messages : null);
    }, [messages]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUserID(user ? user.uid : null);
        });
        return () => unsubscribe();
    }, [userId]);

    const autoExpand = () => {
        const textarea = textareaRef.current;
        textarea.style.height = '1.5em';
        textarea.style.height = Math.min(textarea.scrollHeight, 170) + 'px';
    };
    const handleChange = (e) => {
        setNewMessage(e.target.value);
        autoExpand();
        const button = e.target.parentElement.querySelector('button');
        if (textareaRef.current && textareaRef.current.value === '') {
            button.setAttribute('disabled', 'disabled');
        } else {
            button.removeAttribute('disabled');
        }
    };

    const handleKey = (e) =>{
        if (e.code === "Enter" && !e.shiftKey) {
            e.preventDefault();
            (loading === true)? null : handleSubmit() ;
        }
    }

    const getTextByArticle = (articleNumber) => {
        if (articleNumber === 0) {
            return "ไม่ได้อยู่ในกฎหมายแพ่งและพาณิชย์ แต่อาจอยู่ในกฎหมายอื่นๆ";
        }
        return csvData[articleNumber.toString()] || 'Text not found';
    };

    const handleSubmit = async (e)=>{
        if (newMessage === "") return;
        let message = newMessage
        setNewMessage("")
        autoExpand()
        await new Promise(resolve => setTimeout(resolve, 200));
        setListText(prevList => prevList ? [...prevList, {who: 'user', text: message}] : [{who: 'user', text: message}]);
        try {
            setLoading(true);
            const answer = await axios.post('http://127.0.0.1:5510/predict', {
                input: message
            });
            await new Promise(resolve => setTimeout(resolve, 200));
            console.log('answer.data.prediction',answer.data.prediction)
            const combinedText = answer.data.prediction.map(articleNumber => getTextByArticle(articleNumber)).join('\n\n');
            if (chatId === null ){
                console.log('Create New Chat')
                try {
                    if (combinedText){
                        let result
                        let chatRoomC = {
                            name: "newChatRoom",
                            uid: userId,
                            TimeCreated: new Date(),
                            messages:[{who: 'user', text: message},{who: 'model', text: combinedText}]
                        }
                        const response = await fetch(`http://localhost:3100/addChatRoom?uid=${userId}&document=${chatRoomC}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(chatRoomC)
                        })
                        await new Promise(resolve => setTimeout(resolve, 200))
                        result = await response.json()
                        ChatSelect(result.insertedId)
                        onChatButtonClick(result.insertedId, userId)
                        LoadChat(userId ,setChatList)
                        setLoading(false);
                        setListText([{who: 'user', text: message}, {who: 'model', text: combinedText}])
                        autoExpand()
                    }
                } catch (error) {
                    console.error("Error adding document: ", error);
                }
            } else {
                let send
                try {
                    if (answer.data.prediction){
                        if (ListText === null){
                            setListText([{who: 'user', text: message}, {who: 'model', text: combinedText}])
                            send = [{who: 'user', text: message}, {who: 'model', text: combinedText}]
                        } else{
                            setListText([...ListText,{who: 'user', text: message}, {who: 'model', text: combinedText}])
                            send = [...ListText,{who: 'user', text: message}, {who: 'model', text: combinedText}]
                        }
                        setLoading(false);
                        await fetch(`http://localhost:3100/addMessage?id=${messages._id}&document=${send}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(send)
                        })
                        autoExpand()
                    }
                } catch (error) {
                    console.error('Error making prediction:', error);
                }
            }
        } catch (error) {
            console.error('Error making prediction:', error);
        }
    }
    useEffect(() => {
        chatContainerRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }, [ListText]);


    return(
        <>
            <div className="ChatContent-container">
                <div className="chat-container-scroll" >
                    <div className="chat-container-Empty" >
                        { ListText === null?(
                            <>
                            <div className="NewChat-Container">
                                <div>
                                    <h1>เริ่มใช้ Thanos</h1>
                                </div>
                            </div>
                            </>
                        ):(
                                <div className="chat-container" id="scroller" ref={chatContainerRef}>
                                    {ListText.map((message,index) => (
                                        message.who === "model" ? (
                                            <ModelChat key={index} text={message.text} />
                                        ) : (
                                            <UserChat key={index} text={message.text} user={auth.currentUser.displayName} photoURL={auth.currentUser.photoURL} />
                                        )
                                    ))}
                                    {loading && <ModelSkeleton />}
                                    <div ref={chatContainerRef}></div>
                                </div>
                        )}
                    </div>
                </div>
                <div className="bottom-chat-input">
                    <form action="" onSubmit={handleSubmit} onKeyDown={handleKey} className="input-Container">
                        <textarea ref={textareaRef}
                            name="promptInput"
                            placeholder="คุยกับ 1MAN&3GUY............." id=""
                            onChange={(e) => {handleChange(e)}}
                            value={newMessage}
                        ></textarea>
                        {!loading?(
                            <button type="submit">
                                <FontAwesomeIcon icon={faPaperPlane} size="xl" style={{ color: newMessage ? 'white' : '' }} id="faPaperPlane"/>
                            </button>
                        ):(
                            <div className="loadSpin"></div>
                        )}
                    </form>
                </div>
                <p className="warning">Thanos มีโอกาสผิดพลาดได้. กรุณาเช็คข้อมูลก่อนทุกครั้ง.</p>
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
                <div dangerouslySetInnerHTML={{ __html: `${text}`.replace(/\n/g, '<br>') }} className="UserChat-text"/>
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
            <div dangerouslySetInnerHTML={{ __html: `${text}`.replace(/\n/g, '<br>') }} className="ModelChat-text"/>
        </div>
        </>
    );
}

export default ChatContent