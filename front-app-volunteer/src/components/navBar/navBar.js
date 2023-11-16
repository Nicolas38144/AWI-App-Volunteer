import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './navBar.css'; // Importer le fichier CSS
import logo from '../../images/logo31_couleur.png'

export default function NavBar({ hasReceivedMessages, hasNews, setVal }) {
  console.log(hasNews)
  return (
    <div className='navBar'>
        <nav className='navigation'>
            <Link to={'/general'}><img src={logo} className='logo' ></img></Link>
            <NavLink className="current" to='/general' onClick={() => setVal(0)}> Informations {hasNews ? <span className='notification'></span> : ''}</NavLink>
            <NavLink className="current" to='/general' onClick={() => setVal(1)}> Planning </NavLink>
            <NavLink className="current" to='/general' onClick={() => setVal(2)}> Inscription </NavLink>
            <NavLink className='current' to='/general' onClick={() => setVal(3)}> Messagerie {hasReceivedMessages ? <span className='notification'></span> : ''}</NavLink>
            <NavLink className="current" to='/general' onClick={() => setVal(4)}> Forum </NavLink>
            <NavLink className="monprofil" to='/general' onClick={() => setVal(5)}> Mon Profil </NavLink>
        </nav>
    </div>
  );
}
