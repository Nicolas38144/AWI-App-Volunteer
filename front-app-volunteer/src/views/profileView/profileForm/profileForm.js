import React,{ useState, useEffect } from 'react';
import { db, auth } from '../../../firebase';
import { doc, updateDoc, collection, getDocs } from "firebase/firestore";
import { encryptData, decryptData } from '../../../components/encryption';

import './profileForm.css';

export default function ProfileForm(props){
    
    const [roleUsers, setRoleUsers] = useState([])
    useEffect(() => {
        const getUsersRole = async () => {
            try {
                const usersCollection = collection(db, 'users');
                const querySnapshot = await getDocs(usersCollection);
                var listUsers = [];
                querySnapshot.docs.forEach((doc) => {
                    listUsers.push(decryptData(doc.data().pseudo)); // Extrait le champ 'pseudo' de chaque document
                });
                setRoleUsers(listUsers);
            } 
            catch (error) {
                console.log(error);    
            }
        }
        getUsersRole();
    }, [])

    const user = props.user;
    const setUser = props.setUser;
    const [formData, setFormData] = useState({
        prenom: user.prenom,
        nom: user.nom,
        email: user.email,
        nbParticipation: user.nbParticipation,
        hebergement: user.hebergement,
        pseudo: user.pseudo,
        tel: user.tel,
        adresse: user.adresse,
        jeuPrefere: user.jeuPrefere,
    });

    const handleUpdateProfile = async (updatedData) => {
        if (roleUsers.includes(updatedData.pseudo)) {
            alert("Ce pseudo est déjà utilisé")
        }
        else {
            try {
                // console.log(updatedData)
                // Update Firestore user document
                const updatedUser = {
                    prenom: updatedData.prenom,
                    nom: updatedData.nom,
                    email: user.email,
                    nbParticipation: updatedData.nbParticipation,
                    hebergement: updatedData.hebergement,
                    pseudo: updatedData.pseudo,
                    tel: updatedData.tel,
                    adresse: updatedData.adresse,
                    jeuPrefere: updatedData.jeuPrefere,
                    role: user.role,
                }
                const updatedUserEncrypt = {
                    prenom: encryptData(updatedData.prenom),
                    nom: encryptData(updatedData.nom),
                    email: encryptData(user.email),
                    nbParticipation: encryptData(updatedData.nbParticipation),
                    hebergement: encryptData(updatedData.hebergement),
                    pseudo: encryptData(updatedData.pseudo),
                    tel: encryptData(updatedData.tel),
                    adresse: encryptData(updatedData.adresse),
                    jeuPrefere: encryptData(updatedData.jeuPrefere),
                    role: user.role,
                }
                // Update the local state with the new data
                await updateDoc(doc(db, 'users', auth.currentUser.uid), updatedUserEncrypt);
                setUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
                // console.log('Profile updated successfully!');
            } 
            catch (error) { 
                console.error('Error updating profile:', error);
            }
            setChangeBtn(true);
            setBtnText('Modifier mon profil')
        }
    };
        
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdateProfile(formData);
    };

        
            
    const setChangeBtn = props.setChangeBtn;
    const setBtnText = props.setBtnText;
    
    return (
        <div className='profileForm'>
            <h2 className='title'>Modifier mon profil</h2>
            <form onSubmit={handleSubmit} className='formUser'>
                <div className='boxs'>
                    <div className='boxInfo'>
                        <h3>Coordonnées</h3>
                        <label className='info'>
                            Prénom : 
                            <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} />
                        </label>
                        <label className='info'>
                            Nom :
                            <input type="text" name="nom" value={formData.nom} onChange={handleChange} />
                        </label>
                        <label className='info'>
                            Adresse : 
                            <input type="text" name="adresse" value={formData.adresse} onChange={handleChange} />
                        </label>
                        <label className='info'>
                            Téléphone :
                            <input type="number" name="tel" pattern='[0-9]*' maxLength={10} value={formData.tel} onChange={handleChange} />
                        </label>
                        
                    </div>
                    <div className='boxInfo'>
                        <h3>Autres</h3>
                        <label className='info'>
                            Pseudo : 
                            <input type="text" name="pseudo" value={formData.pseudo} onChange={handleChange} />
                        </label>
                        <label className='info'>
                            Participations :
                            <input type="number" name="nbParticipation" value={formData.nbParticipation} onChange={handleChange} />
                        </label>
                        <label className='info'>
                            Hébergement :
                            <select name="hebergement" value={formData.hebergement} onChange={handleChange} >
                                <option value="" disabled hidden>Selectionner...</option>
                                <option value="proposer">Proposer</option>
                                <option value="recherche">Recherche</option>
                                <option value="rien">Rien</option>
                            </select>
                        </label>                    
                        <label className='info'>
                            Jeu préféré :
                            <select type="text" name="jeuPrefere" value={formData.jeuPrefere} onChange={handleChange} >
                                <option value="Non renseigné">Selectionner</option>
                                {props.games.map((row, index) => (
                                    <option key={index}  value={row['Nom_jeu']}>{row['Nom_jeu']}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                </div>
                <button type="submit" className='updateBtn'> Sauvegarder</button>
            </form>
        </div>
    );
}