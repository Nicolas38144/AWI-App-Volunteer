import React, { useEffect, useState } from 'react';
import { db, auth } from '../../../firebase';
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";

import './roleView.css';

export default function RoleView(props){

    const users = props.listUser;
    const setListUser = props.setListUser;
    const [currentUserRole, setCurrentUserRole] = useState('');

    useEffect(() => {
        // console.log("users : ",users);
        // Vérifier le rôle de l'utilisateur actuel
        const checkUserRole = async () => {
            try {
                const currentUserDocRef = doc(db, 'users', auth.currentUser.uid);
                const currentUserDocSnapshot = await getDoc(currentUserDocRef);
                setCurrentUserRole(currentUserDocSnapshot.data().role);
                console.log('Role de l\'utilisateur actuel :', currentUserRole);
            } catch (error) {
                console.error('Erreur lors de la vérification du rôle de l\'utilisateur actuel :', error);
            }
        };
        checkUserRole();
    }, [users, currentUserRole]);

    const changeRole = async (userId, newRole) => {
        try {
            const userDocRef = doc(db, 'users', userId);
            // Mettre à jour uniquement le rôle de l'utilisateur spécifique
            await setDoc(userDocRef, { role: newRole }, { merge: true });
            // Vous pouvez également mettre à jour localement votre state si nécessaire
            setListUser(prevUsers => {
                return prevUsers.map(user => {
                    if (user.id === userId) {
                        return { ...user, data: { ...user.data, role: newRole } };
                    }
                    return user;
                });
            });
        } catch (error) {
            console.log(error);
        }
        try {
            const userDocRef = doc(db, 'users', userId);
            await deleteDoc(userDocRef);
            setListUser(prevUsers => prevUsers.filter(user => user.id !== userId));
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur :', error);
        }
    }

    const deleteUserById = async (userId) => {
        try {
            await deleteUser(userId).then(() => {
                console.log("User correctly deleted");
            }).catch((error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    }


    return(
        <div className='roleView'>
            <h1>roleView</h1>
            {/* Utilisez la méthode map pour afficher chaque utilisateur */}
            <div className='listUsers'>
                {users
                    .filter(user => user.data.role !== 'superAdmin' || currentUserRole === 'superAdmin')
                    .map(user => (
                    <div key={user.id} className='userInfo'>
                        <p>{user.data.prenom} {user.data.nom} - {user.data.email}</p>
                        <p>Role : {user.data.role} </p>
                        {user.data.role === 'benevole' ?
                            <div>
                                <button onClick={() => changeRole(user.id, 'admin')}>Passer admin </button>
                                <button onClick={() => deleteUserById(user.id)}>Supprimer cet utilisateur</button>
                            </div>
                            :
                            <div>
                                {currentUserRole === 'superAdmin' ?
                                    <div>  
                                        <button onClick={() => changeRole(user.id, 'benevole')}>Passer bénévole </button>
                                        <button onClick={() => deleteUserById(user.id)}>Supprimer cet utilisateur</button>
                                    </div>
                                    :
                                    <div>  
                                        <button onClick={() => changeRole(user.id, 'benevole')}>Passer bénévole </button>
                                    </div>
                                }
                                </div>
                        }         
                    </div>
                ))}
            </div>
        </div>
    );
}