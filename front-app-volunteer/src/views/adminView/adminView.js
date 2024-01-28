import React,{useEffect, useState} from 'react';

import './adminView.css';

export default function AdminView(props){
    useEffect(() => {},[]);

    const [newfest, setnewfest] = useState(false);
    const [affecth, setaffecth] = useState(false);
    const [affectr, setaffectr] = useState(false);

    const handlefest = () => { 
        setnewfest(true);
        setaffecth(false);
        setaffectr(false)
    }

    const handler = () => { 
        setnewfest(false);
        setaffecth(false);
        setaffectr(true)
    }

    const handleh = () => { 
        setnewfest(false);
        setaffecth(true);
        setaffectr(false)
    }

    return(
        <div className='adminView'>
            <h1>AdminView</h1>
            <button type='button' className='updateBtn' onClick={handleh}>Choix des horaires</button>
            {affecth ? <h2>choix des h</h2> : ''}
            <button type='button' className='updateBtn' onClick={handler}>Modifier les rôles</button>
            {affectr ? <h2>choix des r</h2> : ''}
            <button type='button' className='updateBtn' onClick={handlefest}>Créer un festival</button>
            {newfest? <h2>Création de festival</h2> : ''}
        </div>
    );
}