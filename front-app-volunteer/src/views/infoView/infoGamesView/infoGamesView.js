import React, { useEffect, useState } from 'react';
import urlExist from "url-exist"

import Img_not from './img_not_available.png';

import './infoGamesView.css';

export default function InfoGamesView(props){    
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredGames, setFilteredGames] = useState(props.games);
    const [filterOption, setFilterOption] = useState('all');
    const [uniquePublishers, setUniquePublishers] = useState([]);
    const [selectedPublisher, setSelectedPublisher] = useState('');

    useEffect(() => {
        // console.log(props.games);
        const filteredResults = props.games.filter((game) => {
            const matchSearchQuery = game.data['Nom_jeu'].toLowerCase().includes(searchQuery.toLowerCase());
            const matchPublisher = selectedPublisher === '' || game.data['Editeur'] === selectedPublisher;
            if (filterOption === 'oui') {
                return matchSearchQuery && game.data['Recu'] === 'oui' && matchPublisher;
            } else if (filterOption === 'non') {
                return matchSearchQuery && game.data['Recu'] === 'non' && matchPublisher;
            }
            return matchSearchQuery && matchPublisher;
        });
        setFilteredGames(filteredResults);
    }, [searchQuery, filterOption, selectedPublisher, props.games]);

    useEffect(() => {
        const publishers = props.games.reduce((publishers, game) => {
            if (game.data['Editeur'] && !publishers.includes(game.data['Editeur'])) {
                return [...publishers, game.data['Editeur']];
            }
            return publishers;
        }, []);
        setUniquePublishers(publishers);
    }, [props.games]);
   

    const filteredGamesCount = filteredGames.length;
    const receivedGamesCount = filteredGames.filter(game => game.data['Recu'] === 'oui').length;
    const notReceivedGamesCount = filteredGames.filter(game => game.data['Recu'] === 'non').length;

    return(
        <div className='infoGamesView'>
            <div className='allGames'>
                <div className='text-filed'>
                    <input
                        className='inputName'
                        type="text"
                        placeholder="Chercher un jeu"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className='radio'>
                    <label>
                        <input
                        type='radio'
                        name='filterOption'
                        value='all'
                        checked={filterOption === 'all'}
                        onChange={() => setFilterOption('all')}
                        />
                        Tous les jeux ({filteredGamesCount})
                    </label>
                    <label>
                        <input
                        type='radio'
                        name='filterOption'
                        value='oui'
                        checked={filterOption === 'oui'}
                        onChange={() => setFilterOption('oui')}
                        />
                        Reçu ({receivedGamesCount})
                    </label>

                    <label>
                        <input
                        type='radio'
                        name='filterOption'
                        value='non'
                        checked={filterOption === 'non'}
                        onChange={() => setFilterOption('non')}
                        />
                        Pas reçu ({notReceivedGamesCount})
                    </label>
                    <label>
                        Éditeur :
                        <select value={selectedPublisher} onChange={(e) => setSelectedPublisher(e.target.value)} >
                        <option value=''>Tous les éditeurs</option>
                        {uniquePublishers.map((publisher) => (
                            <option key={publisher} value={publisher}>
                                {publisher}
                            </option>
                        ))}
                        </select>
                    </label>
                </div>

                {filteredGames.length > 0 ? (
                <ul>
                    {filteredGames.map((row, index) => (
                    <li key={row.id} className='gamesBox'>
                        <h2>{row.data['Nom_jeu']}</h2>
                        <div className='infoGame'>
                            <h3>Informations générales</h3>
                            <div className='infoGen'>
                                <div className='texts'>
                                    <p>Auteur(s) : {row.data['Auteur'] || 'Non renseigné'} </p>
                                    <p>Éditeur : {row.data['Editeur'] || 'Non renseigné'} </p> 
                                    <p>Age minimum : {row.data['Age_min'] || 'Non renseigné'} </p>
                                    <p>Durée : {row.data['Duree'] || 'Non renseigné'} </p>
                                    <p>Mécanismes : {row.data['Mecanismes'] || 'Non renseigné'} </p>
                                    <p>Nombre de joueurs : {row.data['Nb_joueurs'] || 'Non renseigné'} </p>
                                    <p>Thèmes : {row.data['Themes'] || 'Non renseigné'} </p>
                                    <p>Type : {row.data['Type'] || 'Non renseigné'} </p> 
                                </div>
                                <div className='img'>
                                    <img 
                                        src={row.data['Image']} 
                                        alt='Non renseigné' 
                                        style={{ maxWidth: '200px', width: '100%'}}
                                        onError={(e) => {
                                            e.target.onerror = null; // Remove the event handler to prevent an infinite loop
                                            e.target.src = Img_not; // Sets the fallback image
                                        }} 
                                    />
                                </div>
                            </div>
                            

                            <h3>Pour l'animation</h3>
                            <div className='texts'>
                                <p>À animer : {row.data['A_animer'] || 'Non renseigné'} </p> 
                                <p>Reçu : {row.data['Recu'] || 'Non renseigné'} </p> 
                            </div>

                            <h3>Comment jouer</h3>
                            <div className='texts'>
                                <p>Notice : {row.data['Notice'] ? <a href={row.data['Notice']}>{row.data['Notice']}</a> : 'Non renseigné'}</p> 
                                <p>Vidéo : {row.data['Video'] ? <a href={row.data['Video']}>{row.data['Video']}</a> : 'Non renseigné'}</p>
                            </div>

                            <h3>Zones</h3>
                            <div className='texts'>
                                <p>Zone bénévole : {row.data['Zone_benevole'] || 'Non renseigné'} </p>  
                                <p>Zone plan: {row.data['Zone_plan'] || 'Non renseigné'} </p>
                            </div>
                        </div> 
                    </li>
                    ))}
                </ul>
                ) : (
                    <p className='notFound'>Aucun jeu correspondant trouvé</p>
                )}
            </div>
        </div>  
    );
}