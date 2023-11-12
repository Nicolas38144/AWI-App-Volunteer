import React,{useEffect} from 'react';
import Button from '../../components/button/button.js';

import ImageFond from '../../images/logo31_couleur.png';

import './homeView.css';

export default function HomeView(props){
    useEffect(() => {},[]);


    return(
        <div className='homeView'>
            <div className='image-container'>
                <img className="background" src={ImageFond} alt="Fond"></img>
            </div>
            <div className="login-button">
                <Button 
                    text="Se connecter" 
                    textColor="white"
                    bgColor="#002663"
                    >
                </Button>
            </div> 
        </div>
    );
}