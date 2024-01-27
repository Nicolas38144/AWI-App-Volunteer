import React,{ useState } from 'react';
import { db, auth } from '../../../firebase';
import { doc, updateDoc } from "firebase/firestore";
// import jsonData from '../../../components/awi_games.json';
import './profileForm.css';

export default function ProfileForm(props){
    
    const handleUpdateProfile = async (updatedData) => {
        try {
            console.log(updatedData)
            // Update Firestore user document
            await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                prenom: updatedData.prenom,
                nom: updatedData.nom,
                nbParticipation: updatedData.nbParticipation,
                herbergement: updatedData.herbergement,
                pseudo: updatedData.pseudo,
                tel: updatedData.tel,
                adreese: updatedData.adreese,
                jeu_pref: updatedData.jeu_pref,
            });
            // Update the local state with the new data
            setUser({
                ...user,
                prenom: updatedData.prenom,
                nom: updatedData.nom,
                nbParticipation: updatedData.nbParticipation,
                herbergement: updatedData.herbergement,
                pseudo: updatedData.pseudo,
                tel: updatedData.tel,
                adreese: updatedData.adreese,
                jeu_pref: updatedData.jeu_pref,
            });
            console.log('Profile updated successfully!');
            setChangeBtn(true);
            setBtnText('Modifier mon profil')
            } catch (error) { console.error('Error updating profile:', error); setBtnText('Modifier mon profil'); setChangeBtn(true)}
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
        const user = props.user;
        const setUser = props.setUser;
        const setBtnText = props.setBtnText;

        const [formData, setFormData] = useState({
            prenom: user.prenom,
            nom: user.nom,
            nbParticipation: user.nbParticipation,
            herbergement: user.herbergement,
            pseudo: user.pseudo,
            tel: user.tel,
            adreese: user.adreese,
            jeu_pref: user.jeu_pref,
        });

        console.log(user);
        console.log(formData);
        
        return (
            <div className='profileRead'>
                <h2 className='title'>Modifier mon profil</h2>
                <form onSubmit={handleSubmit}>
                <div class="form-row">
                    <label>
                        Prénom : 
                        <input
                        type="text"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleChange}
                        />
                    </label>
                    <label>
                        Nom :
                        <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        />
                    </label>
                    </div>
                    <div class="form-row">
                    <label>
                        Participations :
                        <input
                        type="number"
                        name="nbParticipation"
                        value={formData.nbParticipation}
                        onChange={handleChange}
                        />
                    </label>
                    <label>
                        Herbergement :
                        <select
                        name="herbergement"
                        value={formData.herbergement}
                        onChange={handleChange}
                        >
                        <option value="">Selectionner...</option>
                        <option value="proposer">Proposer</option>
                        <option value="recherche">Recherche</option>
                        <option value="rien">Rien</option>
                        </select>
                    </label>
                    </div>
                    <div class="form-row">
                    <label>
                        Pseudo : 
                        <input
                        type="text"
                        name="pseudo"
                        value={formData.pseudo}
                        onChange={handleChange}
                        />
                    </label>
                    <label>
                        Téléphone :
                        <input
                        type="text"
                        name="tel"
                        pattern='[0-9]*'
                        maxLength={10}
                        value={formData.tel}
                        onChange={handleChange}
                        />
                    </label>
                    </div>
                    <div class="form-row">
                    <label>
                        Adresse : 
                        <input
                        type="text"
                        name="adreese"
                        value={formData.adreese}
                        onChange={handleChange}
                        />
                    </label>
                    {/* <label>
                        Jeu préféré :
                        <select
                        type="text"
                        name="jeu_pref"
                        value={formData.jeu_pref}
                        onChange={handleChange}
                        >
                        <option value="">Selectionner...</option>
                        {jsonData.map((row, index) => (
                                <option value={row['Nom_jeu']}>{row['Nom_jeu']}</option>
                            ))}
                        </select>
                    </label> */}
                    </div>
                    <button type="submit" className='updateBtn'> Sauvegarder</button>
            </form>
            </div>

            
            
            
            
        );
}