import React from 'react';
import { NavLink } from 'react-router-dom';
import './navBar.css'; // Importer le fichier CSS

export default function NavBar({ hasReceivedMessages, hasNews }) {
  console.log(hasNews)
  return (
    <div className='navBar'>
        <nav className='navigation'>
            <NavLink className="current" to="/general"> Informations {hasNews ? <span className='notification'></span> : ''}</NavLink>
            <NavLink className="current" to="/general"> Planning </NavLink>
            <NavLink className="current" to="/general"> Inscription </NavLink>
            <NavLink className='current' to="/general"> Messagerie </NavLink>
            <NavLink className="current" to="/general"> Forum </NavLink>
            <NavLink className="monprofil" to="/general"> Mon Profil </NavLink>
        </nav>
    </div>
  );
}
