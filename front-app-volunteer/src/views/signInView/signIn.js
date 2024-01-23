import React,{useEffect} from 'react';
import { useNavigate  } from 'react-router-dom';

import './signIn.css';
import ImageFond from '../../images/logo31_couleur.png';

export default function SignIn(props){
    useEffect(() => {},[]);

    const navigate = useNavigate();
    const handleClick = () => { navigate('/general'); };

    return(
        <div className='signIn'>
            <div className="left-panel">
                <div className='content'>
                    <h3>Nouveau ici ?</h3>
                    <div className="register-button">
                        <button className="btn" onClick={handleClick}>S'inscrire</button>
                    </div>
                </div>
                <img className="background" src={ImageFond} alt="Fond"></img>
            </div>
            <div className="right-panel">
                    <h2 className="title">Se connecter</h2>
                    <div className='fields'>
                        <div className="input-field">
                            <input type="text" placeholder="Username" />
                        </div>
                        <div className="input-field">
                            <input type="password" placeholder="Password" />
                        </div>
                        <div className="login-button">
                            <button className="btn " onClick={handleClick}>Connexion</button>
                        </div>
                    </div>             
            </div>
        </div>
    );
}