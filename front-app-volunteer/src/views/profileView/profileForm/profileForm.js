/*
import React,{ useEffect, useState } from 'react';
import { db, auth } from '../../../firebase';
import { doc, updateDoc, getDoc } from "firebase/firestore";
*/
import React from 'react';
import './profileForm.css';

export default function ProfileForm(props){
    /*
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
        };*/

        /*
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
            */
            
            const user = props.user;
            return (
                <div className='profileRead'>
                    <h2 className='title'>Modifier mon profil</h2>
                    <p className='info'>Prenom: {user.prenom}</p>
                    <p className='info'>Nom: {user.nom}</p>
                    <p className='info'>Email: {user.email}</p>
                    <p className='info'>Participation: {user.nbParticipation}</p>
                    <p className='info'>Herbergement: {user.herbergement}</p>
                </div>
                /*
                <form onSubmit={handleSubmit}>
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
                */
            );
}