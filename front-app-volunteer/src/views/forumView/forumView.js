import React, { useEffect, useState } from 'react'; //, { useState, useEffect, useRef }
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase" 

import ChatGeneralView from './chatGeneralView/chatGeneralView';
import FaqView from './faqView/faqView';

import './forumView.css';

export default function ForumView(props) {
    
    const [questions, setQuestions] = useState([])
    
    useEffect(() => {
        const getAllQuestions = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "questions"));
                var listQuestions = [];
                querySnapshot.forEach((doc) => {
                    // console.log(doc.id);
                    listQuestions.push({id: doc.id, data: doc.data()});
                });
                setQuestions(listQuestions);
            } catch (error) {
                console.log(error);
            }
        }
        getAllQuestions();
    }, [])
    
    return (
        <div className='forumView'>
            <ChatGeneralView actualUser={props.actualUser}/>
            <FaqView actualUser={props.actualUser} questions={questions} setQuestions={setQuestions} />
        </div>
    );
}
