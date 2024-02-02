import React,{useEffect, useState} from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

import './planningView.css';

export default function PlanningView(props){
    useEffect(() => {
      getData();
    },[]);

      const [postes, setPostes] = useState([]);
      const [zones, setZones] = useState([]);
      const [plages, setPlages] = useState([]);


      const getData = async () => { 
        // get zones
        if (localStorage.getItem('zones') == null || typeof(localStorage.getItem('zones')) == 'undefined') {
          try {
              const querySnapshot = await getDocs(collection(db, "zone_benevole"));
              var listZones = []
              querySnapshot.forEach((doc) => {
                  listZones.push(doc.data())
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

      // get postes
      if (localStorage.getItem('postes') == null || typeof(localStorage.getItem('postes')) == 'undefined') {
        try {
            const querySnapshot = await getDocs(collection(db, "postes"));
            var listPostes = []
            querySnapshot.forEach((doc) => {
                listPostes.push(doc.data())
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
      if (localStorage.getItem('plages') == null || typeof(localStorage.getItem('plages')) == 'undefined') {
        try {
            const querySnapshot = await getDocs(collection(db, "plage_horaire"));
            var listPlage = []
            querySnapshot.forEach((doc) => {
                listPlage.push(doc.data())
            });
            setPlages(listPlage)
            localStorage.setItem('plages', JSON.stringify(listPlage));
        } catch (error) {
            console.error('Error fetching postes data:', error);
        }
      }
      else {
          setPlages(JSON.parse(localStorage.getItem('plages')));
      }
    }
      
    
    console.log(plages)
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
                        <td>{unposte.intitule}</td>
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
                    <th className='quadrille'>Zones bénévoles</th>
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
                        <td>{unezone.intitule}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
}