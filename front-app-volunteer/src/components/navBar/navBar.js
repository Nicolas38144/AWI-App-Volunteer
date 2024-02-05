import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

import './navBar.css'; // Importer le fichier CSS
import logo from '../../images/logo31_couleur.png'
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';

export default function NavBar({ hasReceivedMessages, hasNews, setVal }) {

    const navigate = useNavigate();
    const handleLogout = async () => { 
        await signOut(auth);
        localStorage.removeItem('zones');
        localStorage.removeItem('postes');
        localStorage.removeItem('games');
        localStorage.removeItem('user')
        navigate('/login'); 
    };

  return (
    <div className='navBar'>
      <NavLink id="nav-menu-button" to='/' onClick={() => console.log("affiche le menu")}> Menu </NavLink>
        <nav className='navigation'>
            <Link onClick={() => setVal(0)} to={'/'}><img src={logo} className='logo' alt='logo'></img></Link>
            <NavLink className="current" to='/' onClick={() => setVal(0)}> Informations {hasNews ? <span className='notification'></span> : ''}</NavLink>
            <NavLink className="current" to='/' onClick={() => setVal(1)}> Planning </NavLink>
            <NavLink className="current" to='/' onClick={() => setVal(2)}> Inscription </NavLink>
            {/* <NavLink className='current' to='/' onClick={() => setVal(3)}> Messagerie {hasReceivedMessages ? <span className='notification'></span> : ''}</NavLink> */}
            <NavLink className="current" to='/' onClick={() => setVal(4)}> Discussion </NavLink>
            <NavLink className="monprofil" to='/' onClick={() => setVal(5)}> Mon Profil </NavLink>
            <IconButton 
                className='icon'
                color="primary" 
                aria-label="Se déconnecter" 
                variant="outlined" 
                onClick={handleLogout}
                sx={{position: 'relative', left: '20vw', color: 'rgb(213, 215, 225)', '&:hover': { color: 'white', },}}>
                <LogoutIcon />
            </IconButton >
        </nav>
    </div>
  );
}
