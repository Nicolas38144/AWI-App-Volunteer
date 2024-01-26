import React from 'react';

import './profileRead.css';

export default function ProfileRead(props){
    const user = props.user;
    return (
        <div className='profileRead'>
            <h2 className='title'>Mon profil</h2>
            <p className='info'>Prenom: {user.prenom}</p>
            <p className='info'>Nom: {user.nom}</p>
            <p className='info'>Email: {user.email}</p>
            <p className='info'>Participation: {user.nbParticipation}</p>
            <p className='info'>Herbergement: {user.herbergement}</p>
        </div>
    )
}

/* 
pseudo
adreese
 tel
 admin
 referent soirée
 jeu pref
*/