import React from 'react';

import './profileRead.css';

export default function ProfileRead(props){
    const user = props.user;
    return (
        <div className='profileRead'>
            <h2 className='title'>Mon profil</h2>
            <p className='info'>Prenom : {user.prenom}</p>
            <p className='info'>Nom : {user.nom}</p>
            {user.pseudo ? <p className='info'>Pseudo: {user.pseudo}</p> : ''}
            <p className='info'>Email : {user.email}</p>
            <p className='info'>Participation(s) : {user.nbParticipation}</p>
            {user.jeu_pref ? <p className='info'>Jeu préféré: {user.jeu_pref}</p> : ''}
            <p className='info'>Herbergement : {user.herbergement}</p>
            {user.adreese ? <p className='info'>Adresse : {user.adreese}</p> : ''}
            {user.tel ? <p className='info'>Téléphone : {user.tel}</p> : ''}
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