import React, { useEffect, useState } from 'react';
import './infoView.css';

export default function InfoView(props){
    
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredGames, setFilteredGames] = useState(props.games);
    const [filterOption, setFilterOption] = useState('all');

    useEffect(() => {
        console.log(filteredGames);
    }, [filteredGames]);

    useEffect(() => {
        // // Filter games based on the search query
        // const filteredResults = props.games.filter((game) =>
        //     game['Nom_jeu'].toLowerCase().includes(searchQuery.toLowerCase())
        // );
        const filteredResults = props.games.filter((game) => {
            const matchSearchQuery =
              game['Nom_jeu'].toLowerCase().includes(searchQuery.toLowerCase());
      
            if (filterOption === 'oui') {
              return matchSearchQuery && game['Recu'] === 'oui';
            } else if (filterOption === 'non') {
              return matchSearchQuery && game['Recu'] === 'non';
            }
      
            return matchSearchQuery;
          });
        setFilteredGames(filteredResults);
    }, [searchQuery, filterOption, props.games]);

    return(
        <div className='infoView'>
            <h1>InfoView</h1>

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
                        Tous les jeux
                    </label>

                    <label>
                        <input
                        type='radio'
                        name='filterOption'
                        value='oui'
                        checked={filterOption === 'oui'}
                        onChange={() => setFilterOption('oui')}
                        />
                        Reçu
                    </label>

                    <label>
                        <input
                        type='radio'
                        name='filterOption'
                        value='non'
                        checked={filterOption === 'non'}
                        onChange={() => setFilterOption('non')}
                        />
                        Pas reçu
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
                    <p>Aucun jeu correspondant trouvé.</p>
                )}
            </div>
        </div>  
    );
}