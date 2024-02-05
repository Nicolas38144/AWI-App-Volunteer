import React,{ useEffect, useState } from 'react';
import { db, auth } from '../../firebase';
import { doc, getDoc } from "firebase/firestore";
import { decryptData } from '../../components/encryption';

import ProfileRead from './profileRead/profileRead';
import ProfileForm from './profileForm/profileForm';

import './profileView.css';

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
                            prenom: decryptData(userDoc.data().prenom),
                            nom: decryptData(userDoc.data().nom),
                            email: auth.currentUser.email,
                            nbParticipation: decryptData(userDoc.data().nbParticipation),
                            hebergement: decryptData(userDoc.data().hebergement),
                            //optionnels
                            pseudo: decryptData(userDoc.data().pseudo),
                            adresse: decryptData(userDoc.data().adresse),
                            tel: decryptData(userDoc.data().tel),
                            role: userDoc.data().role,
                            jeuPrefere: decryptData(userDoc.data().jeuPrefere),
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
                        hebergement: userData.hebergement,
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
    return (
        <div className='profileView'>
            {changeBtn ? 
                <ProfileRead user={user} setVal={setVal} /> 
                : 
                <ProfileForm games={props.games} setChangeBtn={setChangeBtn} setBtnText={setBtnText} user={user} setUser={setUser} />
            }
            <div className='btn'>
                <button type='button' className='updateBtn' onClick={changeRender}>{btnText}</button>
            </div>
        </div>
    );
}