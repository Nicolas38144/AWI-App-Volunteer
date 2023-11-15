import React from 'react';
import { NavLink } from 'react-router-dom';
import './navBar.css'; // Importer le fichier CSS

export default function NavBar({ hasReceivedMessages, hasNews }) {
  console.log(hasNews)
  return (
    <div className='navBar'>
        <nav className='navigation'>
            <NavLink className="current" to="/"> Informations {hasNews ? <span className='notification'></span> : ''}</NavLink>
            <NavLink className="current" to="/"> Planning </NavLink>
            <NavLink className="current" to="/"> Inscription </NavLink>
            <NavLink className='current' to="/"> Messagerie </NavLink>
            <NavLink className="current" to="/"> Forum </NavLink>
            <NavLink className="monprofil" to="/"> Mon Profil </NavLink>
        </nav>
    </div>
  );
}
