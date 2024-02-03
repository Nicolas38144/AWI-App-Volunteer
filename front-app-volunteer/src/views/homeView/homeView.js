import React, { useEffect, useState } from 'react';
import { collection, doc, getDocs, getDoc, getCountFromServer } from 'firebase/firestore'
import { db, auth } from '../../firebase';

import InfoView from '../infoView/infoView';
import PlanningView from '../planningView/planningView'; 
import RegisterPlanningView from '../registerPlanningView/registerPlanningView';
import ChatView from '../chatView/chatView';
import ForumView from '../forumView/forumView';
import ProfileView from '../profileView/profileView';
import AdminView from '../adminView/adminView';

import NavBar from '../../components/navBar/navBar'


import './homeView.css';

export default function HomeView(props){
    
    const [val, setVal] = useState(0);
    const [games, setGames] = useState([]);
    const [countUsers, setCountUsers] = useState([]);
    const [actualUser, setActualUser] = useState(null);
    const [postes, setPostes] = useState([]);
    const [affectations_z, setAffectations_z]=useState([]) // affectations zones
    const [affectations_p, setAffectations_p]=useState([]) // affectations postes
    const [zones, setZones] = useState([]);
    const [plages, setPlages] = useState([]);
    const [jours, setJours] = useState([]);
    const joursDeLaSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    const ordrecreneaux = ['9h-11h', '11h-14h', '14h-17h', '17h-20h', '20h-22h'];

    useEffect(() => {
        const fetchZonesData = async () => {
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
        }
        fetchZonesData();
    }, [val]);

    useEffect(() => {
        const fetchAffectZonesData = async () => {
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
                setAffectations_z(JSON.parse(localStorage.getItem('affectation_z')));
            }
        }
        fetchAffectZonesData();
    }, [val]);

    useEffect(() => {
        const fetchAffectPostesData = async () => {
          // get affectations postes
        if (localStorage.getItem('affectation_p') == null || typeof(localStorage.getItem('affectation_p')) == 'undefined') {
            try {
                const querySnapshot = await getDocs(collection(db, "affecter_poste"));
                var listaffectPostes = [];
                querySnapshot.forEach((doc) => {
                    listaffectPostes.push({id: doc.id, data: doc.data()})
                });
                setAffectations_p(listaffectPostes)
            } catch (error) {
                console.error('Error fetching postes data:', error);
            }
        }
            else {
                setAffectations_p(JSON.parse(localStorage.getItem('affectation_p')));
            }
        }
        fetchAffectPostesData();
    }, [val]);

    useEffect(() => {
        const fetchPlagesData = async () => {
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
      fetchPlagesData();
    }, [val]);

    useEffect(() => {
        const fetchPostesData = async () => {
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
        }
        fetchPostesData();
    }, [val]);

    useEffect(() => {
        const fetchGamesData = async () => {
            if (localStorage.getItem('games') == null || typeof(localStorage.getItem('games')) == 'undefined') {
                // console.log("heyy");
                try {
                    const querySnapshot = await getDocs(collection(db, "games"));
                    var listGames = []
                    querySnapshot.forEach((doc) => {
                        // console.log(doc.id, " => ", doc.data());
                        listGames.push({id: doc.id, data: doc.data()})
                    });
                    setGames(listGames)
                    // console.log(listGames);
                    localStorage.setItem('games', JSON.stringify(listGames));
                } catch (error) {
                    console.error('Error fetching games data:', error);
                }
            }
            else {
                setGames(JSON.parse(localStorage.getItem('games')));
            }
        }
        fetchGamesData();
    }, [val]);

    useEffect(() => {
        const fetchUsersCount = async () => {
            const coll = collection(db, "users");
            const snapshot = await getCountFromServer(coll);
            setCountUsers(snapshot.data().count);
        };
        fetchUsersCount();
    }, []);

    useEffect(() => {
        const getUserData = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    // console.log("auth.currentUser.uid : ", user.uid);
                    const docRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(docRef);
                    setActualUser(docSnap);
                } catch (err) {
                    console.log(err);
                }
            } else {
                setActualUser(null);
            }
        });
        return () => getUserData(); 
    }, []);

    console.log(affectations_z)

    const renderView = () => {
        switch (val) {
            case 0:
                return <InfoView games={games} countUsers={countUsers}/>;
            case 1:
                return <PlanningView />;
            case 2:
                return <RegisterPlanningView postes={postes} affectations_p={affectations_p} affectations_z={affectations_z} jours={jours} plages={plages} zones={zones}/>;
            case 3:
                return <ChatView />;
            case 4:
                return <ForumView actualUser={actualUser} />;
            case 5:
                return <ProfileView setVal={setVal} games={games} />;
            case 6: 
                return <AdminView setVal={setVal}/>;
            default:
                return <InfoView />;
        }
    };

    return(
        <div className='HomeView'>
            <div>
                <NavBar hasReceivedMessages={true} hasNews={true} setVal={setVal}/>
            </div>
            <div className='renderView'>
                {renderView()}
            </div>
        </div>
    );
}
