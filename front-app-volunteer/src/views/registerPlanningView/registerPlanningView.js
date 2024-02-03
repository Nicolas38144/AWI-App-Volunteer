import React,{useEffect, useState} from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

import './registerPlanningView.css';

export default function RegisterPlanningView(props){
    useEffect(() => {
      },[]);
  
      const jours = props.jours;
      const zones = props.zones;
      const plages = props.plages;
      const postes = props.postes;
      const affectations_z = props.affectations_z



        // retourne le nombre d'inscrit a tel poste pour tel créneau
        const nbinscrits_zone = (id_creneau, zone_benevole) => { 
            var nb=0;
            affectations_z.map((affectation)=>{
                if (affectation.data.id_plage===id_creneau && affectation.data.zone===zone_benevole){
                    nb++
                }
            })
            return nb;
        }

      
        
      return(
          <div className='registerplanning'>
              <h1>Inscription</h1>
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
                          <td>{unposte.intitule}</td>
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
                          <td>{unezone.intitule}</td>
                          {plages.map((plage) => (

                            
                            <td>
                            <>{
                            }</>
                               <button className='inscription'>{nbinscrits_zone(plage.id, unezone.intitule)} / 2</button>
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