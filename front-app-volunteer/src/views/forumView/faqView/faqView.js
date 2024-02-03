import React, { useState, useEffect, useRef } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import './faqView.css';

export default function FaqView(props) {
    
    const [question, setQuestion] = useState('');

    const sendQuestion = async () => {
        console.log("envoie de ", question);
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
                    <div className='question'>
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
                        <p>en attente</p>
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className='answered'>
                    <p>répondue</p>
                    </div>
                </TabPanel>
            </Tabs>
            
        </div>
    );
}
