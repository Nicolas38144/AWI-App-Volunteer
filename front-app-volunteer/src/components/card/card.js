import React from "react";

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
                    text="S'inscrire" 
                    textColor="white"
                    bgColor="#002663"
                    handleClick={props.handleClick}
                    >
                </Button>
            </div>
        </div>
    )
}