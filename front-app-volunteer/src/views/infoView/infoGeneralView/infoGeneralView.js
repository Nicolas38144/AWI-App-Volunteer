import React, { useState, useEffect } from "react"

import './infoGeneralView.css';

export default function InfoGeneralView(props){
    const [filteredGames, setFilteredGames] = useState(props.games);
    const [uniqueEditors, setUniqueEditors] = useState(new Set());
    const [showEditors, setShowEditors] = useState(false);

    useEffect(() => {
        // console.log(props.games);
        const filteredResults = props.games.filter((game) => {
            // console.log(game);
            if (game.data['Editeur']) { setUniqueEditors((prevEditors) => new Set([...prevEditors, game.data['Editeur']])); }
            return game.data['Nom_jeu'].toLowerCase();
        });
        setFilteredGames(filteredResults);
    }, [props.games]);

    const filteredGamesCount = filteredGames.length;
    const receivedGamesCount = filteredGames.filter(game => game.data['Recu'] === 'oui').length;
    const notReceivedGamesCount = filteredGames.filter(game => game.data['Recu'] === 'non').length;
    const uniqueEditorsCount = uniqueEditors.size;

    const getGamesCountForEditor = (editor) => {
        return filteredGames.filter(game => game.data['Editeur'] === editor).length;
    };

    return (
        <div className="infoGeneralView"> 
            <p>Nombre de bénévole(s) inscrit(s) : {props.countUsers}</p>
            <div className="editors">
                <div className="lign">
                    <p>Nombre d'éditeur(s) : {uniqueEditorsCount}</p>
                    <button onClick={() => setShowEditors(!showEditors)}>
                        {showEditors ? 'Cacher les éditeurs' : 'Afficher tous les éditeurs'}
                    </button>
                </div>
                {showEditors && (
                    <ul>
                    {[...uniqueEditors].map((editor) => (
                        <li key={editor}>{editor} ({getGamesCountForEditor(editor)})</li>
                    ))}
                </ul>
                )}
            </div>
            <p>Nombre de jeux prévus : {filteredGamesCount}</p>
            <p>Nombre de jeux reçus : {receivedGamesCount}</p>
            <p>Nombre de jeux non reçus : {notReceivedGamesCount}</p>
            <p>Coordonnées des référents des postes choisis : </p>
        </div>
    );
}
