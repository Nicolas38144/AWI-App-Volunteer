import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase';
import { collection, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

import './forumView.css';

export default function ForumView(props) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const messagesRef = collection(db, 'messages');

        const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
            const newMessages = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMessages(newMessages);
        });

        return () => unsubscribe();
    }, []);

    const handleSendMessage = async () => {
        const user = auth.currentUser;
        if (!user) {
            console.log('Utilisateur non connecté');
            return;
        }

        await addDoc(collection(db, 'messages'), {
            text: newMessage,
            userId: user.uid,
            timestamp: serverTimestamp(),
        });

        setNewMessage('');
    };

    return (
        <div className='forumView'>
            <h1>ForumView</h1>
            <div className='chatContainer'>
                <div className='messagesContainer'>
                    {messages.map((message) => (
                        <div key={message.id} className='message'>
                            <p>{message.text}</p>
                        </div>
                    ))}
                </div>
                <div className='inputContainer'>
                    <input
                        type='text'
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder='Écrivez votre message...'
                    />
                    <button onClick={handleSendMessage}>Envoyer</button>
                </div>
            </div>
        </div>
    );
}
