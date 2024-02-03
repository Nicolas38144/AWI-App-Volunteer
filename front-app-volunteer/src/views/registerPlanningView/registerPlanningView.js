import React,{useEffect, useState} from 'react';
import { db } from '../../firebase';
import { collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';

import './registerPlanningView.css';

export default function RegisterPlanningView(props){
    useEffect(() => {
      },[]);
  
      const jours = props.jours;
      const zones = props.zones;
      const plages = props.plages;
      const postes = props.postes;
      const actualUser = props.actualUser
      const affectations_z = props.affectations_z;
      const affectations_p = props.affectations_p;
      const setVal = props.setVal;
      const isRegisteredPoste = props.isRegisteredPoste;
      const isRegisteredZone = props.isRegisteredZone


    // retourne le nombre d'inscrit a tel zone pour tel créneau
    const nbinscrits_zone = (id_creneau, zone_benevole) => { 
        var nb=0;
        affectations_z.map((affectation)=>{
            if (affectation.data.id_plage===id_creneau && affectation.data.zone===zone_benevole){
                nb++
            }
        })
        return nb;
    }

    // Inscrit l'utilisateur à un poste
    const registerPoste = async (iduser, id_creneau, poste) => {
        const postecol = collection(db, 'affecter_poste');

        try {
            
            await addDoc(postecol, { id_user: iduser, id_plage: id_creneau, poste: poste });
            affectations_p.push({ id_user: iduser, id_plage: id_creneau, poste: poste });
            console.log('Inscription terminée');
            setVal(1)
        } catch (error) {
            console.error('Erreur lors de l\'inscription :', error);
        }
    };

    // Supprime l'inscription d'un utilisateur à un poste
    async function unregisterPoste(iduser, id_creneau, poste) {
        const postescol = collection(db, 'affecter_poste');
    
        try {
        const querySnapshot = await getDocs(postescol);
        
        querySnapshot.forEach(async (doc) => {
            const data = doc.data();
            if (data.id_user === iduser && data.id_plage === id_creneau && data.poste === poste) {
            await deleteDoc(doc.ref);
            console.log('Inscription supprimée');
            }
        });
        setVal(1)
        } catch (error) {
        console.error('Erreur lors de la suppression de l\'inscription :', error);
        }
    }

    // Inscrit l'utilisateur à une zone
    const registerZone = async (iduser, id_creneau, zone) => {
        const zonecol = collection(db, 'affecter_zone');

        try {
            
            await addDoc(zonecol, { id_user: iduser, id_plage: id_creneau, zone: zone });
            affectations_z.push({ id_user: iduser, id_plage: id_creneau, zone: zone });
            console.log('Inscription terminée');
            setVal(1)
        } catch (error) {
            console.error('Erreur lors de l\'inscription :', error);
        }
    };

    // Supprime l'inscription d'un utilisateur à une zone d'acti
    async function unregisterZone(iduser, id_creneau, zone) {
        const zonecol = collection(db, 'affecter_zone');
    
        try {
        const querySnapshot = await getDocs(zonecol);
        
        querySnapshot.forEach(async (doc) => {
            const data = doc.data();
            if (data.id_user === iduser && data.id_plage === id_creneau && data.zone === zone) {
            await deleteDoc(doc.ref);
            console.log('Inscription supprimée');
            }
        });
        setVal(1)
        } catch (error) {
        console.error('Erreur lors de la suppression de l\'inscription :', error);
        }
    }

    // retourne le nombre d'inscrit a tel poste pour tel créneau
    const nbinscrits_poste = (id_creneau, poste) => { 
        var nb=0;
        affectations_p.map((affectation)=>{
            if (affectation.data.id_plage===id_creneau && affectation.data.poste===poste){
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
                          <td>{unposte.data.intitule}</td>
                          {plages.map((plage) => (
                            <td>
                            {isRegisteredPoste(actualUser.id, plage.id, unposte.data.intitule) ?
                            <button className='desinscription'
                            onClick={()=>unregisterPoste(actualUser.id, plage.id, unposte.data.intitule)}
                            >{nbinscrits_poste(plage.id, unposte.data.intitule)}/{unposte.data.capacite}</button>
                            :
                            <button className='inscription'
                            onClick={()=>registerPoste(actualUser.id, plage.id, unposte.data.intitule)}
                            >{nbinscrits_poste(plage.id, unposte.data.intitule)}/{unposte.data.capacite}</button>
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
                                <button className='desinscription'
                                onClick={()=>unregisterZone(actualUser.id, plage.id, unezone.data.intitule)}
                                >{nbinscrits_zone(plage.id, unezone.data.intitule)} / 2</button>
                                :
                                <button className='inscription'
                                onClick={()=>registerZone(actualUser.id, plage.id, unezone.data.intitule)}
                                >{nbinscrits_zone(plage.id, unezone.data.intitule)} / 2</button>
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