import React, { useEffect, useState } from 'react';
import { db, auth } from '../../../firebase'
import { getDoc, doc } from 'firebase/firestore';

import './profileRead.css';

export default function ProfileRead(props){

    const user = props.user;
    const setVal = props.setVal;
    const [role, setRole] = useState();
    
    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
                if (userDoc.exists()) {
                    // console.log('role : ', userDoc.data().role);
                    setRole(userDoc.data().role);
                }
            } catch (error) {
                console.error('Error fetching user role:', error);
            }
        }
        fetchUserRole();
    }, []);

   

    return (
        <div className='profileRead'>
           {(role === 'admin' || role === 'superAdmin') && <button className='btnadmin' onClick={() => setVal(6)}>Administration</button>}
            <h2 className='title'>Mon profil</h2>
            <div className='boxs'>
                <div className='boxInfo'>
                    <h3>Coordonnées</h3>
                    <p className='info'>Prenom : {user.prenom}</p>
                    <p className='info'>Nom : {user.nom}</p>
                    <p className='info'>Email : {user.email}</p>
                    <p className='info'>Adresse : {user.adresse || 'Non renseigné'} </p>
                    <p className='info'>Téléphone : {user.tel || 'Non renseigné'} </p>
                </div>
                <div className='boxInfo'>
                    <h3>Autres</h3>
                    <p className='info'>Pseudo : {user.pseudo || 'Non renseigné'} </p>
                    <p className='info'>Participation(s) : {user.nbParticipation}</p>
                    <p className='info'>Hebergement : {user.hebergement}</p>
                    <p className='info'>Jeu préféré : {user.jeuPrefere || 'Non renseigné'} </p>
                    <p className='info'>Role : {user.role} </p>
                </div>            
            </div>
        </div>
    )
}