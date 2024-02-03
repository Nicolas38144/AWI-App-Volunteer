import React, { useEffect, useState } from 'react';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../../../firebase" 
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import './faqView.css';

export default function FaqView(props) {
    
    const [question, setQuestion] = useState('');

    useEffect(() => {
        console.log("props.questions : ",props.questions); 
    }, [])

    const sendQuestion = async (e) => {
        e.preventDefault();
        const auteur = props.actualUser.data().prenom + " " + props.actualUser.data().nom
        try {
            const newDoc = await addDoc(collection(db, "questions"), {
                auteur: auteur,
                estRepondue: false,
                question: question,
                reponse: ""
            });
            props.setQuestions(prevQuestions => [
                ...prevQuestions,
                {
                    id: newDoc.id,
                    data: {
                        auteur: auteur,
                        estRepondue: false,
                        question: question,
                        reponse: ""
                    }
                }
            ]);
        } catch (error) {
            console.log(error);
        }
        setQuestion('');
    }

    return (
        <div className='faqView'>
            <h2>FAQ</h2>
            <Tabs className='custom-tabs'>
                <TabList className='custom-tab-list'>
                    <Tab className='custom-tab'>Poser une question</Tab>
                    <Tab className='custom-tab'>Question(s) en attente</Tab>
                    <Tab className='custom-tab'>Question(s) répondue(s)</Tab>
                </TabList>

                <TabPanel>
                    <div className='askQuestion'>
                        <form onSubmit={sendQuestion}>
                                <textarea
                                    placeholder='Votre question'
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    required
                                    maxLength={300}
                                />
                            <button type='submit'>Envoyer</button>
                        </form>
                        
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className='pending'>
                        <div className='box'>
                            {props.questions.map((question, index) => (
                                question.data.estRepondue === false && (
                                    <div key={question.id} className='data'>
                                        <div className='aut'>
                                            <p className='first_p'>Auteur : </p>
                                            <p className='seconde_p' >{question.data.auteur}</p>
                                        </div>
                                        <div className='ques'>    
                                            <p className='first_p'>Question : </p>
                                            <p className='seconde_p'>{question.data.question}</p>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className='answered'>
                    {props.questions.map((question, index) => (
                            <div key={question.id}>
                                {question.data.estRepondue === true &&
                                    <div>
                                        <p> Auteur : {question.data.auteur}</p>
                                        <p> Question : {question.data.question}</p>
                                        <p> Réponse : {question.data.reponse}</p>
                                    </div>   
                                }
                        </div>
                        ))}
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
}
