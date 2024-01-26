import React, { useEffect, useState } from 'react';
import jsonData from '../../components/awi_games.json';

import './infoView.css';

export default function InfoView(props){
    
    const [jsonDataState, setJsonDataState] = useState(null);

    useEffect(() => {
        setJsonDataState(jsonData);
    }, []);

    return(
        <div className='infoView'>
            <h1>InfoView</h1>

            <div>
                {jsonDataState && (
                <ul>
                    {jsonDataState.map((row, index) => (
                    <li key={row['Nom_jeu']}>
                        <strong>{row['Nom_jeu']}</strong> - Éditeur: {row['Editeur']}, Type: {row['Type']}, À animer: {row['A_animer']}
                    </li>
                    ))}
                </ul>
                )}
            </div>
        </div>  
    );
}