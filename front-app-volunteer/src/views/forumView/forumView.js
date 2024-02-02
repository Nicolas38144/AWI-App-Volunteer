import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, onSnapshot, addDoc, serverTimestamp, orderBy, query } from 'firebase/firestore';

import './forumView.css';

export default function ForumView(props) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const userId = props.actualUser.id;
    const userData = props.actualUser.data();

    useEffect(() => {
        const messagesRef = collection(db, 'messages');
        const orderedMessagesQuery = query(messagesRef, orderBy('timestamp', 'asc'));
        const unsubscribe = onSnapshot(orderedMessagesQuery, (snapshot) => {
            const newMessages = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMessages(newMessages);
        });
        return () => unsubscribe();
    }, []);

    // useEffect(() => {
    //     console.log(props.actualUser);
    // }, [props.actualUser]);

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

    
    return (
        <div className='forumView'>
            <h1>ForumView</h1>
            <div className='chatContainer'>
                <h2>Chat général</h2>
                <div className='messagesContainer'>
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`message ${message.userId === userId ? 'ownMessage' : 'otherMessage'}`}
                        >
                             <div className='userInfo'>
                                <p>{userData.prenom} {userData.nom}</p>
                            </div>
                            <p>{message.text}</p>
                        </div>
                    ))}
                </div>
                <hr />
                <div className='inputContainer'>
                    <input
                        type='text'
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder='Votre message...'
                    />
                    <button onClick={handleSendMessage}>Envoyer</button>
                </div>
            </div>
        </div>
    );
}
