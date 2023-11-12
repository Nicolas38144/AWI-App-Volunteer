import React,{useEffect} from 'react';

import ImageFond from '../../images/logo31_couleur.png';

import './homeView.css';

export default function HomeView(props){
    useEffect(() => {},[]);
    //ajoute une fonction add


    return(
        <div className='homeView'>
            <div className='image-container'>
                <img className="background" src={ImageFond} alt="Fond"></img>
            </div>
            <button className="login-button">Se connecter</button>

        </div>
    );
}