import React,{ useState } from 'react';
import { db, auth } from '../../../firebase';
import { updateEmail } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import './profileForm.css';

export default function ProfileForm(props){
    
    const user = props.user;
    const setUser = props.setUser;
    const [formData, setFormData] = useState({
        prenom: user.prenom,
        nom: user.nom,
        email: user.email,
        nbParticipation: user.nbParticipation,
        herbergement: user.herbergement,
        pseudo: user.pseudo,
        tel: user.tel,
        adresse: user.adresse,
        jeuPrefere: user.jeuPrefere,
    });

    const handleUpdateProfile = async (updatedData) => {
        try {
            console.log(updatedData)
            // Update Firestore user document
            const updatedUser = {
                prenom: updatedData.prenom,
                nom: updatedData.nom,
                email: user.email,
                nbParticipation: updatedData.nbParticipation,
                herbergement: updatedData.herbergement,
                pseudo: updatedData.pseudo,
                tel: updatedData.tel,
                adresse: updatedData.adresse,
                jeuPrefere: updatedData.jeuPrefere,
                role: user.role,
            }
            // Update the local state with the new data
            await updateDoc(doc(db, 'users', auth.currentUser.uid), updatedUser);
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            console.log('Profile updated successfully!');
        } 
        catch (error) { 
            console.error('Error updating profile:', error);
        }
        setChangeBtn(true);
        setBtnText('Modifier mon profil')
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
                            Herbergement :
                            <select name="herbergement" value={formData.herbergement} onChange={handleChange} >
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
                                    <option key={row['Nom_jeu']}  value={row['Nom_jeu']}>{row['Nom_jeu']}</option>
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