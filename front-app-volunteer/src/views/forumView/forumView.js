import React from 'react'; //, { useState, useEffect, useRef }

import ChatGeneralView from './chatGeneralView/chatGeneralView';
import FaqView from './faqView/faqView';

import './forumView.css';

export default function ForumView(props) {
    
    return (
        <div className='forumView'>
            <ChatGeneralView actualUser={props.actualUser}/>
            <FaqView actualUser={props.actualUser} />
        </div>
    );
}
