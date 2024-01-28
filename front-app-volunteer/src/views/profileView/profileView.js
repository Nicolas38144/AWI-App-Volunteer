import React,{ useEffect, useState } from 'react';
import { db, auth } from '../../firebase';
import { doc, getDoc } from "firebase/firestore";

import './profileView.css';
import ProfileRead from './profileRead/profileRead';
import ProfileForm from './profileForm/profileForm';

export default function ProfileView(props){

    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = JSON.parse(localStorage.getItem('user'));
                // console.log("userData : ",userData);
                if (userData === null) {
                    const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
                    if (userDoc.exists()) {
                        const userInfo = {
                            //obligatoires
                            uid: auth.currentUser.uid,
                            prenom: userDoc.data().prenom,
                            nom: userDoc.data().nom,
                            email: auth.currentUser.email,
                            nbParticipation: userDoc.data().nbParticipation,
                            herbergement: userDoc.data().herbergement,
                            //optionnels
                            pseudo: userDoc.data().pseudo,
                            adresse: userDoc.data().adresse,
                            tel: userDoc.data().tel,
                            role: userDoc.data().role,
                            jeuPrefere: userDoc.data().jeuPrefere,
                        }
                        setUser(userInfo);
                        const token = await auth.currentUser.getIdToken();
                        localStorage.setItem('token', JSON.stringify(token));
                        localStorage.setItem('user', JSON.stringify(userInfo));
                    }
                }
                else {
                    setUser({
                        uid: userData.uid,
                        prenom: userData.prenom,
                        nom: userData.nom,
                        email: userData.email,
                        nbParticipation: userData.nbParticipation,
                        herbergement: userData.herbergement,
                        pseudo: userData.pseudo,
                        adresse: userData.adresse,
                        tel: userData.tel,
                        role: userData.role,
                        jeuPrefere: userData.jeuPrefere,
                    })
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        
        const fetchData = async () => {
            await fetchUserData();
        };

        fetchData();

    }, []);    

    const [changeBtn, setChangeBtn] = useState(true);
    const [btnText, setBtnText] = useState('Modifier mon profil');

    const changeRender = () => { 
        setChangeBtn(!changeBtn);
        setBtnText(!changeBtn ? 'Modifier mon profil' : 'Annuler');
    }

    const setVal = props.setVal;
    // console.log("user: ", user);
    return (
        <div className='profileView'>
            {changeBtn ? 
                <ProfileRead user={user} setVal={setVal} /> 
                : 
                <ProfileForm games={props.games} setChangeBtn={setChangeBtn} setBtnText={setBtnText} user={user} setUser={setUser} />}
            <div className='btn'>
                <button type='button' className='updateBtn' onClick={changeRender}>{btnText}</button>
            </div>
        </div>
    );
}