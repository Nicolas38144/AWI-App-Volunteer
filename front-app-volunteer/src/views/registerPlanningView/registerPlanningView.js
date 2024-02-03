import React,{useEffect, useState} from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

import './registerPlanningView.css';

export default function RegisterPlanningView(props){
    useEffect(() => {
        getData();
        if (plages.length===0){getData()}
      },[]);
  
        const [postes, setPostes] = useState([]);
        const [affectations_z, setAffectations_z]=useState([]) // affectations zones
        const [zones, setZones] = useState([]);
        const [plages, setPlages] = useState([]);
        const [jours, setJours] = useState([]);
        const joursDeLaSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
        const ordrecreneaux = ['9h-11h', '11h-14h', '14h-17h', '17h-20h', '20h-22h'];
  
  
        const getData = async () => {
          // get zones
          if (localStorage.getItem('zones') == null || typeof(localStorage.getItem('zones')) == 'undefined') {
            try {
                const querySnapshot = await getDocs(collection(db, "zone_benevole"));
                var listZones = [];
                querySnapshot.forEach((doc) => {
                    listZones.push({id: doc.id, data: doc.data()})
                });
                setZones(listZones)
                localStorage.setItem('zones', JSON.stringify(listZones));
            } catch (error) {
                console.error('Error fetching zones data:', error);
            }
        }
        else {
            setZones(JSON.parse(localStorage.getItem('zones')));
        }

        // get affectations zones
        if (localStorage.getItem('affectation_z') == null || typeof(localStorage.getItem('affectation_z')) == 'undefined') {
        try {
            const querySnapshot = await getDocs(collection(db, "affecter_zone"));
            var listaffectZones = [];
            querySnapshot.forEach((doc) => {
                listaffectZones.push({id: doc.id, data: doc.data()})
            });
            setAffectations_z(listaffectZones)
        } catch (error) {
            console.error('Error fetching zones data:', error);
        }
    }
        else {
            setPostes(JSON.parse(localStorage.getItem('postes')));
        }
  
        // get postes
        if (localStorage.getItem('postes') == null || typeof(localStorage.getItem('postes')) == 'undefined') {
          try {
              const querySnapshot = await getDocs(collection(db, "postes"));
              var listPostes = []
              querySnapshot.forEach((doc) => {
                  listPostes.push({id: doc.id, data: doc.data()})
              });
              setPostes(listPostes)
              localStorage.setItem('postes', JSON.stringify(listPostes));
          } catch (error) {
              console.error('Error fetching postes data:', error);
          }
        }
        else {
            setPostes(JSON.parse(localStorage.getItem('postes')));
        }
  
        // get plages
          try {
              const querySnapshot = await getDocs(collection(db, "plage_horaire"));
              var listPlage = []
              var listPlage2 = []
              var listJours = new Set()
              querySnapshot.forEach((doc) => {
                  listPlage.push({id: doc.id, data: doc.data()})
                  listJours.add(doc.data().jour)
              });
  
            // classe les jours dans l'ordre
              const joursNonOrdonnesArray = Array.from(listJours);
              const joursOrdonnesResultat = joursNonOrdonnesArray.sort((a, b) => {
                return joursDeLaSemaine.indexOf(a) - joursDeLaSemaine.indexOf(b);
              });
              
              listJours = []
              joursOrdonnesResultat.forEach((unjour) => {
                listJours.push({"jour": unjour})
              });
              setJours(listJours);

              // classe les plages horaires dans l'ordre
              // parcourt les créneaux et les jours dans l'ordre puis les ajoute dans une 2e listePlage
              jours.map((unjour)=>{
                ordrecreneaux.forEach((creneau)=>{
                    listPlage.map((uneplage)=>{
                        if (uneplage.data.jour === unjour.jour && uneplage.data.horaire===creneau){ listPlage2.push(uneplage)}
                    })
                })
              })
              setPlages(listPlage2)
          } catch (error) {
              console.error('Error fetching postes data:', error);
          }
        }


        // retourne le nombre d'inscrit a tel poste pour tel créneau
        const nbinscrits_zone = (id_creneau, zone_benevole) => { 
            var nb=0;
            affectations_z.map((affectation)=>{
                console.log(affectation.data.id_plage, id_creneau, affectation.data.id_plage==id_creneau)
                if (affectation.data.id_plage===id_creneau && affectation.data.zone===zone_benevole){
                    nb++
                    console.log(nb);
                }
            })
            return nb;
        }

        console.log(jours)
      
        
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
                               <button className='inscription'>{nbinscrits_zone(plage.id, unezone.intitule)}</button>
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