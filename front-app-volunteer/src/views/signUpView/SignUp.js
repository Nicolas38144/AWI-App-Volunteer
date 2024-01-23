import React,{ useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';

import './signUp.css';
import ImageFond from '../../images/logo31_couleur.png';

export default function SignUp(props){
    useEffect(() => {},[]);

    const navigate = useNavigate();
    const handleClickLogin = () => { navigate('/'); };
    const handleClickRegister = () => { navigate('/home'); };

    const [selectedOption, setSelectedOption] = useState('');
    const handleInputChange = (e) => { setSelectedOption(e.target.value); };

    return(
        <div className='signUp'>
            <div className="left-panel">
                <div className='content'>
                    <h3>Déjà inscrit ? </h3>
                    <div className="register-button">
                        <button className="btn" onClick={handleClickLogin}>Se connecter</button>
                    </div>
                </div>
                <img className="background" src={ImageFond} alt="Fond"></img>
            </div>
            <div className="right-panel">
                    <h2 className="title">Inscription</h2>
                    <div className='fields'>
                        <div className="input-field">
                            <input type="text" placeholder="Prénom" maxLength={20} pattern="[a-zA-Z]+" />
                        </div>
                        <div className="input-field">
                            <input type="text" placeholder="Nom" maxLength={20}  pattern="[a-zA-Z]+" />
                        </div>
                        <div className="input-field">
                            <input type="email" placeholder="Mail" pattern="[a-zA-Z]+@[a-z]+\.[a-z]+"/>
                        </div>
                        <div className="input-field">
                            <input type="text" placeholder="Mot de passe" maxLength={20} />
                        </div>
                        <div className='others'>
                            <div className="input-field other">
                                <input type="number" placeholder="Participation" maxLength={20} min={0} />
                            </div>
                            <div className="input-field other">
                                <select value={selectedOption} onChange={handleInputChange}>
                                    <option value="" disabled hidden>Hebergement ?</option>
                                    <option value="proposer">Proposer</option>
                                    <option value="recherche">Recherche</option>
                                    <option value="rien">Rien</option>
                                </select>
                            </div>
                        </div>
                        <div className="login-button">
                            <button className="btn " onClick={handleClickRegister}>S'inscrire</button>
                        </div>
                    </div>             
            </div>
        </div>
    );
}