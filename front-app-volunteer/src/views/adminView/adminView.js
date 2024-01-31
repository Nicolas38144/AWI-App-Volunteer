import React,{useEffect, useState} from 'react';
import { db, auth } from '../../firebase';
import { collection, getDocs } from "firebase/firestore";

import RoleView from './roleView/roleView';
import FestivalView from './festivalView/festivalView';

import './adminView.css';

export default function AdminView(props){

    const [listUser, setListUser] = useState([]);
    const [activeTab, setActiveTab] = useState(null);
    const handleTabChange = (tab) => { setActiveTab((prevActiveTab) => (prevActiveTab === tab ? null : tab)); };

    useEffect(() => {
        const fetchUsersData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                var listUsers = []
                querySnapshot.forEach((doc) => {
                    // console.log(auth.currentUser.uid);
                    if (auth.currentUser.uid !== doc.id) {
                        listUsers.push({id: doc.id, data: doc.data()});
                        // console.log(doc.id, " => ", doc.data());
                    }                    
                });
                setListUser(listUsers)
            } catch (error) {
                console.error('Error fetching games data:', error);
            }
        }
        fetchUsersData(); 
    }, []);

    
    
    return(
        <div className='adminView'>
            <h1>AdminView</h1>

            <button type='button' className={`updateBtn ${activeTab === 'horaires' ? 'active' : ''}`} onClick={() => handleTabChange('horaires')}> Choix des horaires </button>
            {activeTab === 'horaires' && <h2>Choix des horaires</h2>}

            <button type='button' className={`updateBtn ${activeTab === 'roles' ? 'active' : ''}`} onClick={() => handleTabChange('roles')}> Modifier les rôles </button>
            {activeTab === 'roles' && <RoleView listUser={listUser} setListUser={setListUser} />}

            <button type='button' className={`updateBtn ${activeTab === 'festival' ? 'active' : ''}`} onClick={() => handleTabChange('festival')}> Créer un festival </button>
            {activeTab === 'festival' && <FestivalView />}
        </div>
    );
}