import React from 'react';
import './navBar.css'; // Importer le fichier CSS

export default function navBar({ }) {


    return(
        <div className="navBar">
            <a href="#accueil">Infos</a>
            <a href="#aPropos">Planning</a>
            <a href="#contact">Inscription</a>
            <a href="#contact">Messagerie</a>
            <a href="#contact" className='monProfil'>Mon Profil</a>
        </div>
    )

}