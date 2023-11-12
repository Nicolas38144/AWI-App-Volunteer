import React from 'react';
import { NavLink } from 'react-router-dom';
import './navBar.css'; // Importer le fichier CSS

export default function NavBar() {
  return (
    <div className='navBar'>
        <nav className='navigation'>
            <NavLink className="current" to="/"> Informations </NavLink>
            <NavLink className="current" to="/"> Planning </NavLink>
            <NavLink className="current" to="/"> Inscription </NavLink>
            <NavLink className="current" to="/"> Messagerie </NavLink>
            <NavLink className="monprofil" to="/"> Mon Profil </NavLink>
        </nav>
    </div>
  );
}
