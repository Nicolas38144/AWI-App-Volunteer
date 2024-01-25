import React,{ useEffect, useState } from 'react';
import { db, auth } from '../../firebase';
import { doc, updateDoc, getDoc } from "firebase/firestore";

import './profilView.css';

export default function ProfilView(props){

    const [user, setUser] = useState({
        uid: '',
        prenom: '',
        nom: '',
        email: '',
        nbParticipation: '',
        herbergement: '',
    });
      
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
                if (userDoc.exists()) {
                    setUser({
                        uid: auth.currentUser.uid,
                        prenom: userDoc.data().prenom,
                        nom: userDoc.data().nom,
                        email: auth.currentUser.email,
                        nbParticipation: userDoc.data().nbParticipation,
                        herbergement: userDoc.data().herbergement,
                    });
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
      
        fetchUserData();
    }, []);


    const handleUpdateProfile = async (updatedData) => {
        try {
            // Update Firestore user document
            await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                prenom: updatedData.prenom,
                nom: updatedData.nom,
                email: updatedData.email,
                nbParticipation: updatedData.nbParticipation,
                herbergement: updatedData.herbergement,
            });
            // Update the local state with the new data
            setUser({
                ...user,
                prenom: updatedData.prenom,
                nom: updatedData.nom,
                email: updatedData.email,
                nbParticipation: updatedData.nbParticipation,
                herbergement: updatedData.herbergement,
            });
            console.log('Profile updated successfully!');
            } catch (error) { console.error('Error updating profile:', error); }
        };

      
    
    // Create a separate ProfileForm component for the update form
    const ProfileForm = ({ onSubmit }) => {
        const [formData, setFormData] = useState({
            prenom: '',
            nom: '',
            nbParticipation: '',
            herbergement: '',
        });
        
        const handleChange = (e) => {
            setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            });
        };
        
        const handleSubmit = (e) => {
            e.preventDefault();
            onSubmit(formData);
        };
        
        return (
            <form onSubmit={handleSubmit}>
            {/* Add input fields for updating profile information */}
            <label>
                First Name:
                <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                />
            </label>
            <label>
                Last Name:
                <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                />
            </label>
            <label>
                Participation:
                <input
                type="number"
                name="nbParticipation"
                value={formData.nbParticipation}
                onChange={handleChange}
                />
            </label>
            <label>
                Herbergement:
                <select
                name="herbergement"
                value={formData.herbergement}
                onChange={handleChange}
                >
                <option value="">Select...</option>
                <option value="proposer">Proposer</option>
                <option value="recherche">Recherche</option>
                <option value="rien">Rien</option>
                </select>
            </label>
            <button type="submit">Update Profile</button>
            </form>
        );
    };

    return (
        <div>
          <h2>Your Profile</h2>
          <p>Prenom: {user.prenom}</p>
          <p>Nom: {user.nom}</p>
          <p>Email: {user.email}</p>
          <p>Participation: {user.nbParticipation}</p>
          <p>Herbergement: {user.herbergement}</p>
    
          {/* Add a form for updating profile information */}
          <ProfileForm onSubmit={handleUpdateProfile} />
        </div>
      );
}