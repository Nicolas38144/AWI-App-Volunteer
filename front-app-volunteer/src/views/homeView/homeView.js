import React, { useEffect, useState } from 'react';

import InfoView from '../infoView/infoView';
import PlanningView from '../planningView/planningView'; 
import RegisterPlanningView from '../registerPlanningView/registerPlanningView';
import ChatView from '../chatView/chatView';
import ForumView from '../forumView/forumView';
import ProfileView from '../profileView/profileView';
import AdminView from '../adminView/adminView';

import NavBar from '../../components/navBar/navBar'


import './homeView.css';

export default function HomeView(props){
    
    const [val, setVal] = useState(0);
    useEffect(() => { //console.log('Updating state:', val); 
    }, [val]);

    const renderView = () => {
        switch (val) {
            case 0:
                return <InfoView />;
            case 1:
                return <PlanningView />;
            case 2:
                return <RegisterPlanningView />;
            case 3:
                return <ChatView />;
            case 4:
                return <ForumView />;
            case 5:
                return <ProfileView setVal={setVal}/>;
            case 6: 
                return <AdminView/>;
            default:
                return <InfoView />;
        }
    };

    return(
        <div className='HomeView'>
            <div>
                <NavBar hasReceivedMessages={true} hasNews={true} setVal={setVal}/>
            </div>
            <div className='renderView'>
                {renderView()}
            </div>
        </div>
    );
}
