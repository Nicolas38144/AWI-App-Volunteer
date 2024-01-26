import React,{ useEffect, useState } from 'react';
import { db, auth } from '../../firebase';
import { doc, getDoc } from "firebase/firestore";

import './profileView.css';
import ProfileRead from './profileRead/profileRead';
import ProfileForm from './profileForm/profileForm';

export default function ProfileView(props){

    const [user, setUser] = useState({
        //obligatoires
        uid: '',
        prenom: '',
        nom: '',
        email: '',
        nbParticipation: '',
        herbergement: '',
        //optionnels
        pseudo: '',
        adreese: '',
        tel: '',
        admin: '',
        referent_soiree: '',
        jeu_pref: '',
    });

    useEffect(() => {

        const fetchUserData = async () => {
            try {
                const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
                if (userDoc.exists()) {
                    const userInfo = {
                        uid: auth.currentUser.uid,
                        prenom: userDoc.data().prenom,
                        nom: userDoc.data().nom,
                        email: auth.currentUser.email,
                        nbParticipation: userDoc.data().nbParticipation,
                        herbergement: userDoc.data().herbergement,
                        pseudo: userDoc.data().pseudo,
                        adreese: userDoc.data().adreese,
                        tel: userDoc.data().tel,
                        admin: userDoc.data().admin,
                        referent_soiree: userDoc.data().referent_soiree,
                        jeu_pref: userDoc.data().jeu_pref,
                    }
                    setUser(userInfo);
                    const token = await auth.currentUser.getIdToken();
                    localStorage.setItem('token', JSON.stringify(token));
                    localStorage.setItem('user', JSON.stringify(userInfo));
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData === null) {
            console.log("hey");
            fetchUserData();
            
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
                adreese: userData.adreese,
                tel: userData.tel,
                admin: userData.admin,
                referent_soiree: userData.referent_soiree,
                jeu_pref: userData.jeu_pref,
            })
        }
    }, []);    

    const [changeBtn, setChangeBtn] = useState(true);
    const [btnText, setBtnText] = useState('Modifier mon profil');

    const changeRender = () => { 
        setChangeBtn(!changeBtn);
        setBtnText(!changeBtn ? 'Modifier mon profil' : 'Sauvegarder les changements');
    }

    return (
        <div className='profilView'>
            {changeBtn ? <ProfileRead user={user} /> : <ProfileForm user={user} setUser={setUser}/>}
            <div className='btn'>
                <button type='button' className='updateBtn' onClick={changeRender}>{btnText}</button>
            </div>
        </div>
    );
}