import React, { useState, useEffect, useRef } from 'react';
import { db } from '../../../firebase';
import { collection, onSnapshot, addDoc, serverTimestamp, orderBy, query } from 'firebase/firestore';
import Send from '../../../images/send.png';

import './chatGeneralView.css';

export default function ChatGeneralView(props) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const userId = props.actualUser.id;
    const userData = props.actualUser.data();
    const messagesContainerRef = useRef(null);

    useEffect(() => {
        const messagesRef = collection(db, 'messages');
        const orderedMessagesQuery = query(messagesRef, orderBy('timestamp', 'asc'));
        const unsubscribe = onSnapshot(orderedMessagesQuery, (snapshot) => {
            const newMessages = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            scrollToBottom();
            setMessages(newMessages);
            
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    const handleSendMessage = async () => {
        await addDoc(collection(db, 'messages'), {
            text: newMessage,
            timestamp: serverTimestamp(),
            userId: userId,
            prenom: userData.prenom,
            nom: userData.nom,            
        });
        setNewMessage('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Empêche le saut de ligne dans le champ de texte
            handleSendMessage();
        }
    };

    
    return (
        <div className='chatContainer'>
            <h2>Chat général</h2>
            <div className='containers'>
                <div className='messagesContainer' ref={messagesContainerRef}>
                    {messages.map((message, index) => (
                        <div
                            key={message.id}
                            className={`message ${message.userId === userId ? 'ownMessage' : 'otherMessage'}`}
                        >
                            {(index === 0 || messages[index - 1].userId !== message.userId) && (
                                <div className='userInfo'>
                                    <p>{message.prenom} {message.nom}</p>
                                </div>
                            )}
                            <div className='msg'>
                                <p>{message.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <hr />
                    <div className='inputContainer'>
                        <div className='inputWithButton'>
                            <input
                                type='text'
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder='Votre message...'
                            />
                            <button onClick={handleSendMessage}>
                                <img src={Send} alt='Envoyer' style={{ maxWidth: '20px', width: '100%'}}/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
