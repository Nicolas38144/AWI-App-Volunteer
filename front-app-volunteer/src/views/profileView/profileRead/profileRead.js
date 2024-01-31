import React, { useEffect } from 'react';

import './profileRead.css';

export default function ProfileRead(props){

    const user = props.user;
    const setVal = props.setVal;
    // const [role, setRole] = useState();
    
    useEffect(() => {
        // const fetchUserData = async () => {
        //     try {
        //         const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
        //         if (userDoc.exists()) {
        //             // console.log('role : ', userDoc.data().role);
        //             setRole(userDoc.data().role);
        //         }
        //     } catch (error) {
        //         console.error('Error fetching user data:', error);
        //     }
        // }
        // fetchUserData();
    }, []);

   

    return (
        <div className='profileRead'>
           {(user.role === 'admin' || user.role === 'superAdmin') && <button className='btnadmin' onClick={() => setVal(6)}>Administration</button>}
            <h2 className='title'>Mon profil</h2>
            <div className='boxs'>
                <div className='boxInfo'>
                    <h3>Coordonnées</h3>
                    <p className='info'>Prenom : {user.prenom}</p>
                    <p className='info'>Nom : {user.nom}</p>
                    <p className='info'>Email : {user.email}</p>
                    <p className='info'>Adresse : {user.adresse || 'Non renseigné'} </p>
                    <p className='info'>Téléphone : {user.tel || 'Non renseigné'} </p>
                </div>
                <div className='boxInfo'>
                    <h3>Autres</h3>
                    <p className='info'>Pseudo : {user.pseudo || 'Non renseigné'} </p>
                    <p className='info'>Participation(s) : {user.nbParticipation}</p>
                    <p className='info'>Herbergement : {user.herbergement}</p>
                    <p className='info'>Jeu préféré : {user.jeuPrefere || 'Non renseigné'} </p>
                    <p className='info'>Role : {user.role} </p>
                </div>            
            </div>
        </div>
    )
}