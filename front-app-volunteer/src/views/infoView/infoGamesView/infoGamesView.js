import React, { useEffect, useState } from 'react';
import './infoGamesView.css';

export default function InfoGamesView(props){    
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredGames, setFilteredGames] = useState(props.games);
    const [filterOption, setFilterOption] = useState('all');
    const [uniquePublishers, setUniquePublishers] = useState([]);
    const [selectedPublisher, setSelectedPublisher] = useState('');

    useEffect(() => {
        const filteredResults = props.games.filter((game) => {
            const matchSearchQuery = game['Nom_jeu'].toLowerCase().includes(searchQuery.toLowerCase());
            const matchPublisher = selectedPublisher === '' || game['Editeur'] === selectedPublisher;
            if (filterOption === 'oui') {
                return matchSearchQuery && game['Recu'] === 'oui' && matchPublisher;
            } else if (filterOption === 'non') {
                return matchSearchQuery && game['Recu'] === 'non' && matchPublisher;
            }
            return matchSearchQuery && matchPublisher;
        });
        setFilteredGames(filteredResults);
    }, [searchQuery, filterOption, selectedPublisher, props.games]);

    useEffect(() => {
        const publishers = props.games.reduce((publishers, game) => {
            if (game['Editeur'] && !publishers.includes(game['Editeur'])) {
                return [...publishers, game['Editeur']];
            }
            return publishers;
        }, []);
        setUniquePublishers(publishers);
    }, [props.games]);

    const filteredGamesCount = filteredGames.length;
    const receivedGamesCount = filteredGames.filter(game => game['Recu'] === 'oui').length;
    const notReceivedGamesCount = filteredGames.filter(game => game['Recu'] === 'non').length;

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
                    <li key={row['Nom_jeu']} className='gamesBox'>
                        <strong>{row['Nom_jeu']}</strong>
                        <div className='infoGame'> 
                            <p>Éditeur : {row['Editeur'] || 'Non renseigné'} </p> 
                            <p>Type : {row['Type'] || 'Non renseigné'} </p> 
                            <p>À animer : {row['A_animer'] || 'Non renseigné'} </p> 
                            <p>Notice : {row['Notice'] ? <a href={row['Notice']}>{row['Notice']}</a> : 'Non renseigné'}</p> 
                            <p>Reçu : {row['Recu'] || 'Non renseigné'} </p> 
                            <p>Vidéo : {row['Video'] ? <a href={row['Video']}>{row['Video']}</a> : 'Non renseigné'}</p>
                            <p>Zone bénévole : {row['Zone_benevole'] || 'Non renseigné'} </p>  
                            <p>Zone plan: {row['Zone_plan'] || 'Non renseigné'} </p>
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