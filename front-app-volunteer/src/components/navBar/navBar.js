import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './navBar.css'; // Importer le fichier CSS
import logo from '../../images/logo31_couleur.png'
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';



export default function NavBar({ hasReceivedMessages, hasNews, setVal }) {

  const navigate = useNavigate();
  const logout = () => { navigate('/'); };

  return (
    <div className='navBar'>
      <NavLink id="nav-menu-button" to='/general' onClick={() => console.log("affiche le menu")}> Menu </NavLink>
        <nav className='navigation'>
            <Link onClick={() => setVal(0)} to={'/general'}><img src={logo} className='logo' alt='logo'></img></Link>
            <NavLink className="current" to='/general' onClick={() => setVal(0)}> Informations {hasNews ? <span className='notification'></span> : ''}</NavLink>
            <NavLink className="current" to='/general' onClick={() => setVal(1)}> Planning </NavLink>
            <NavLink className="current" to='/general' onClick={() => setVal(2)}> Inscription </NavLink>
            <NavLink className='current' to='/general' onClick={() => setVal(3)}> Messagerie {hasReceivedMessages ? <span className='notification'></span> : ''}</NavLink>
            <NavLink className="current" to='/general' onClick={() => setVal(4)}> Forum </NavLink>
            <NavLink className="monprofil" to='/general' onClick={() => setVal(5)}> Mon Profil </NavLink>
            <IconButton color="primary" aria-label="Se déconnecter" variant="outlined" onClick={logout}
            sx={{position: 'relative', left: '14vw',
            '&:hover': {
              color: 'rgb(0, 38, 99)',
            },}}>
              <LogoutIcon />
            </IconButton >
        </nav>
    </div>
  );
}
