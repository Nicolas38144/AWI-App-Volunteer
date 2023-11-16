import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './navBar.css'; // Importer le fichier CSS
import logo from '../../images/logo31_couleur.png'

export default function NavBar({ hasReceivedMessages, hasNews }) {
  console.log(hasNews)
  return (
    <div className='navBar'>
        <nav className='navigation'>
            <Link to={'/general'}><img src={logo} className='logo' ></img></Link>
            <NavLink className="current" to="/general"> Informations {hasNews ? <span className='notification'></span> : ''}</NavLink>
            <NavLink className="current" to="/general"> Planning </NavLink>
            <NavLink className="current" to="/general"> Inscription </NavLink>
            <NavLink className='current' to="/general"> Messagerie {hasReceivedMessages ? <span className='notification'></span> : ''}</NavLink>
            <NavLink className="current" to="/general"> Forum </NavLink>
            <NavLink className="monprofil" to="/general"> Mon Profil </NavLink>
        </nav>
    </div>
  );
}
