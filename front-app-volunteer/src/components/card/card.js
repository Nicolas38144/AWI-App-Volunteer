import React from "react";
import { Link, useLocation } from "react-router-dom"
import TexteField from "../texteField/texteField.js";
import Button from "../button/button.js";

import './card.css';

export default function Card(props) {

    const location = useLocation();

    return (     
        <div className="card">
            <div className="text">
                <p>Se connecter</p>
            </div>
            <div className="form-data">
                <div className="mail">
                    <TexteField label="Mail"></TexteField>
                </div>
                <div className="password">
                    <TexteField label="Mot de passe"></TexteField>
                </div>
            </div>
            <div className="login-button">
                <Button 
                    text="Se connecter" 
                    textColor="white"
                    bgColor="#002663"
                    handleClick={props.handleClick}
                    >
                </Button>
            </div>
            <div className="link">
                {   
                    location.pathname === "/login" ?
                    <div className="register">
                        <Link to="/register">Pas encore inscrit ?</Link>
                    </div>
                    :
                    <div className="login">
                        <Link to="/login">Déjà inscrit ?</Link>
                    </div>
                }
            </div>
            
            
        </div>
    )
}