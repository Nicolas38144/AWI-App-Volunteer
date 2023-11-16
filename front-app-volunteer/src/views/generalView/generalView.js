import React, { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';

import InfoView from '../infoView/infoView';
import PlanningView from '../planningView/planningView'; 
import RegisterPlanningView from '../registerPlanningView/registerPlanningView';
import ChatView from '../chatView/chatView';
import ForumView from '../forumView/forumView';
import ProfilView from '../profilView/profilView';

import NavBar from '../../components/navBar/navBar'
import Button from '../../components/button/button'


import './generalView.css';

export default function GeneralView(props){
    
    const [val, setVal] = useState(0);
    useEffect(() => {
        //console.log('Updating state:', val);
    }, [val]);

    const navigate = useNavigate();
    const handleLogoutClick = () => { navigate('/'); };

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
                return <ProfilView />;
            default:
                return <InfoView />;
        }
    };

    return(
        <div className='generalView'>
            <div>
                <NavBar hasReceivedMessages={true} hasNews={true} setVal={setVal}/>
            </div>
            <div className='renderView'>
                {renderView()}
            </div>
            <div className="logout-button">
                <Button 
                    text="Se déconnecter" 
                    textColor="white"
                    bgColor="#002663"
                    handleClick={handleLogoutClick}
                    >
                </Button>
            </div> 
        </div>
    );
}
