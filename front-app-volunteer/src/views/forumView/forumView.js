import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase" 
import { decryptData } from '../../components/encryption';

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
                    /*const words = doc.data().auteur;
                    console.log("words : ",words);
                    const prenom = decryptData(words.substr(0, 44))
                    const nom = decryptData(words.substr(45)) 
                    const auteur = prenom+" "+nom;
                    console.log("prenom : ",prenom);
                    console.log("nom : ",nom);
                    console.log("auteur : ",auteur);*/
                    listQuestions.push({
                        id: doc.id, 
                        data: {
                            auteur: decryptData(doc.data().auteur),
                            estRepondue: decryptData(doc.data().estRepondue),
                            question: decryptData(doc.data().question),
                            reponse: decryptData(doc.data().reponse)
                        }
                    })
                });
                setQuestions(listQuestions);
            } catch (error) {
                console.log(error);
            }
        }
        getAllQuestions();
    }, [])
    
    console.log("questions :",questions.length);
    return (
        <div className='forumView'>
            <ChatGeneralView actualUser={props.actualUser}/>
            <FaqView actualUser={props.actualUser} questions={questions} setQuestions={setQuestions} />
        </div>
    );
}
/*
U2FsdGVkX18dhB/tCKdZmpPaxdw/8f4jnQcjqZD4jGk=
U2FsdGVkX1/8rC3cR66qh/fa6+G6CiqUFcQHFkSUy44=
44
*/