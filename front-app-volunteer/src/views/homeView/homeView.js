import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase';

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
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGamesData = async () => {
            if (localStorage.getItem('games') == null || typeof(localStorage.getItem('games')) == 'undefined') {
                console.log("heyy");
                try {
                    const querySnapshot = await getDocs(collection(db, "games"));;
                    var listGames = []
                    querySnapshot.forEach((doc) => {
                        // console.log(doc.id, " => ", doc.data());
                        listGames.push(doc.data())
                    });
                    setGames(listGames)
                    console.log(listGames);
                    localStorage.setItem('games', JSON.stringify(listGames));
                } catch (error) {
                    console.error('Error fetching games data:', error);
                }
            }
            else {
                setGames(JSON.parse(localStorage.getItem('games')));
            }
        }
        
        fetchGamesData();

    }, [val]);

    const renderView = () => {
        switch (val) {
            case 0:
                return <InfoView games={games} />;
            case 1:
                return <PlanningView />;
            case 2:
                return <RegisterPlanningView />;
            case 3:
                return <ChatView />;
            case 4:
                return <ForumView />;
            case 5:
                return <ProfileView setVal={setVal} games={games} />;
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
