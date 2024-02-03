import React, { useEffect, useState } from 'react';
import { collection, doc, getDocs, getDoc, getCountFromServer } from 'firebase/firestore'
import { db, auth } from '../../firebase';

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
    const [countUsers, setCountUsers] = useState([]);
    const [actualUser, setActualUser] = useState(null);

    useEffect(() => {
        const fetchGamesData = async () => {
            if (localStorage.getItem('games') == null || typeof(localStorage.getItem('games')) == 'undefined') {
                // console.log("heyy");
                try {
                    const querySnapshot = await getDocs(collection(db, "games"));
                    var listGames = []
                    querySnapshot.forEach((doc) => {
                        // console.log(doc.id, " => ", doc.data());
                        listGames.push({id: doc.id, data: doc.data()})
                    });
                    setGames(listGames)
                    // console.log(listGames);
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

    useEffect(() => {
        const fetchUsersCount = async () => {
            const coll = collection(db, "users");
            const snapshot = await getCountFromServer(coll);
            setCountUsers(snapshot.data().count);
        };
        fetchUsersCount();
    }, []);

    useEffect(() => {
        const getUserData = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    // console.log("auth.currentUser.uid : ", user.uid);
                    const docRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(docRef);
                    setActualUser(docSnap);
                } catch (err) {
                    console.log(err);
                }
            } else {
                setActualUser(null);
            }
        });
        return () => getUserData(); 
    }, []);

    const renderView = () => {
        switch (val) {
            case 0:
                return <InfoView games={games} countUsers={countUsers}/>;
            case 1:
                return <PlanningView />;
            case 2:
                return <RegisterPlanningView />;
            case 3:
                return <ChatView />;
            case 4:
                return <ForumView actualUser={actualUser} />;
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
