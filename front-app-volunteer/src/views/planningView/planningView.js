import React,{useEffect, useState} from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

import './planningView.css';

export default function PlanningView(props){
    useEffect(() => {
    },[]);

    const jours = props.jours;
    const zones = props.zones;
    const plages = props.plages;
    const postes = props.postes;
    const actualUser = props.actualUser;
    const isRegisteredPoste = props.isRegisteredPoste;
    const isRegisteredZone = props.isRegisteredZone;


    return(
        <div className='registerplanning'>
            <h1>Planning Personnel</h1>
            <div className='planning'>
          {jours && postes && zones && plages?
            <table>
                <thead>
                  <tr>
                    <th className='borderright'></th>
                    {jours.map((unjour) => (
                    <>
                    <th className='borderleft'></th>
                    <th></th>
                    <th>{unjour.jour}</th>
                    <th></th>
                    <th className='borderright'></th>
                    </>
                    
                    ))}
                    </tr>
                </thead>
                <thead>
                    <tr>
                    <th className='quadrille'>Poste</th>
                    {jours.map(() => (
                    <>
                    <th className='quadrille'>9h-11h</th>
                        <th className='quadrille'>11h-14h</th>
                        <th className='quadrille'>14h-17h</th>
                        <th className='quadrille'>17h-20h</th>
                        <th className='quadrille'>20h-22h</th>
                    </>
                    
                    ))}
                    </tr>
                </thead>
                <tbody>
                    {postes.map((unposte,index) => (
                    <tr key={index}>
                        <td>{unposte.data.intitule}</td>
                        {plages.map((plage) => (
                          <td>
                          {isRegisteredPoste(actualUser.id, plage.id, unposte.data.intitule) ?
                          <span className='travaille'></span>
                          :
                          ''
                          }
                          </td>
                          ))}
                    </tr>
                    ))}
                </tbody>
            </table> :''}

            {jours && postes && zones && plages ? 
            <table>
                <thead>
                <tr >
                <th className='borderright'></th>
                    {jours.map((unjour) => (
                    <>
                    <th className='borderleft'></th>
                    <th></th>
                    <th>{unjour.jour}</th>
                    <th></th>
                    <th className='borderright'></th>
                    </>
                    
                    ))}
                    </tr>
                </thead>
                <thead>
                    <tr>
                    <td className='quadrille'>Zones bénévoles</td>
                    {jours.map(() => (
                    <>
                    <td className='quadrille'>9h-11h</td>
                        <td className='quadrille'>11h-14h</td>
                        <td className='quadrille'>14h-17h</td>
                        <td className='quadrille'>17h-20h</td>
                        <td className='quadrille'>20h-22h</td>
                    </>
                    
                    ))}
                    </tr>
                </thead>
                <tbody>
                    {zones.map((unezone, index) => (
                    <tr key={index}>
                        <td>{unezone.data.intitule}</td>
                        {plages.map((plage) => (

                          
                          <td>
                              {isRegisteredZone(actualUser.id, plage.id, unezone.data.intitule) ?
                              <div className='travaille'></div>
                              :
                              ''
                              }
                             
                          </td>
                          ))}
                    </tr>
                    ))}
                </tbody>
            </table>
            :''}
            </div>
        </div>
    );
}