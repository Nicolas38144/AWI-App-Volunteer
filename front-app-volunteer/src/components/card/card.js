import React from "react";
import { useNavigate  } from 'react-router-dom';

import TexteField from "../texteField/texteField.js";
import Button from "../button/button.js";

import './card.css';

export default function Card(props) {

    return (     
        <div className="card">
            <div className="form-data">
                <TexteField label="Mail"></TexteField>
                <TexteField label="Mot de passe"></TexteField>
            </div>
            <div className="login-button">
                <Button 
                    text="Se connecter" 
                    textColor="white"
                    bgColor="#002663"
                    onClick={props.handleLoginClick}
                    >
                </Button>
            </div> 
        </div>
    )
}