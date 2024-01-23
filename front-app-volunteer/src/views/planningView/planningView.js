import React,{useEffect, useState} from 'react';

import './planningView.css';

export default function PlanningView(props){
    useEffect(() => {},[]);

    const poste = {
        "activites" : [
          {
            "id": 1,
            "titre": "Cuisine"
          },
          {
            "id": 2,
            "titre": "Accueil"
          },
          {
            "id": 5,
            "titre": "Vente Restauration"
          },
          {
            "id": 3,
            "titre": "Tombola"
          },
          {
            "id": 4,
            "titre": "Forum Associations"
          },
          {
            "id": 4,
            "titre": "Animation jeux"
          }
        ]
      }

      const zone = {
        "zones" : [
          {
            "id": 1,
            "titre": "Espace A1"
          },
          {
            "id": 2,
            "titre": "Espace A2"
          },
          {
            "id": 5,
            "titre": "Espace A3"
          },
          {
            "id": 3,
            "titre": "Espace B2"
          },
          {
            "id": 4,
            "titre": "Espace B4"
          },
          {
            "id": 4,
            "titre": "Espace B5"
          }
        ]
      }
      
    const [postes, setPostes] = useState(poste.activites);
    const [zones, setZones] = useState(zone.zones);

    return(
        <div className='planningView'>
            <h1>PlanningView</h1>
            <div className='planning'>
            <table>
                <thead>
                    <th className='borderright'></th>
                    <th className='borderleft'></th>
                    <th></th>
                    <th>Samedi</th>
                    <th></th>
                    <th className='borderright'></th>
                    <th className='borderleft'></th>
                    <th></th>
                    <th>Dimanche</th>
                </thead>
                <thead>
                    <tr>
                    <th className='quadrille'>Poste</th>
                        <th className='quadrille'>9h-11h</th>
                        <th className='quadrille'>11h-14h</th>
                        <th className='quadrille'>14h-17h</th>
                        <th className='quadrille'>17h-20h</th>
                        <th className='quadrille'>20h-22h</th>
                        <th className='quadrille'>9h-11h</th>
                        <th className='quadrille'>11h-14h</th>
                        <th className='quadrille'>14h-17h</th>
                        <th className='quadrille'>17h-20h</th>
                    </tr>
                </thead>
                <tbody>
                    {postes.map((unposte) => (
                    <tr key={unposte.id}>
                        <td>{unposte.titre}</td>
                    </tr>
                    ))}
                </tbody>
            </table>

            <table>
                <thead>
                    <th className='borderright'></th>
                    <th className='borderleft'></th>
                    <th></th>
                    <th>Samedi</th>
                    <th></th>
                    <th className='borderright'></th>
                    <th className='borderleft'></th>
                    <th></th>
                    <th>Dimanche</th>
                </thead>
                <thead>
                    <tr>
                    <th className='quadrille'>Poste</th>
                        <th className='quadrille'>9h-11h</th>
                        <th className='quadrille'>11h-14h</th>
                        <th className='quadrille'>14h-17h</th>
                        <th className='quadrille'>17h-20h</th>
                        <th className='quadrille'>20h-22h</th>
                        <th className='quadrille'>9h-11h</th>
                        <th className='quadrille'>11h-14h</th>
                        <th className='quadrille'>14h-17h</th>
                        <th className='quadrille'>17h-20h</th>
                    </tr>
                </thead>
                <tbody>
                    {zones.map((unezone) => (
                    <tr key={unezone.id}>
                        <td>{unezone.titre}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
}