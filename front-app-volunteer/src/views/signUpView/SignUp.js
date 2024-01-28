import React,{ useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from 'firebase/auth';

import './signUp.css';
import ImageFond from '../../images/logo31_couleur.png';

export default function SignUp(props){
    useEffect(() => {},[]);

    const navigate = useNavigate();
    const handleClickLogin = () => { navigate('/login'); };
    

    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nbParticipation, setNbParticipation] = useState('');
    const [herbergement, setHerbergement] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User created : OK");

            const uid = userCredential.user.uid;
            console.log("get uid : OK");

            const userDocRef = doc(db, 'users', uid);
            const user = {
                prenom: prenom,
                nom: nom,
                email: email,
                pw: password,
                nbParticipation: nbParticipation,
                herbergement: herbergement,
                pseudo: '',
                adresse:'',
                tel:'',
                role: 'benevole',
                jeuPrefere: '',
            };
            const { pw, ...localUser } = user; 
            await setDoc(userDocRef, user );
            console.log("user stored in db: OK");

            
            localStorage.setItem('token', userCredential.user.accessToken);
            localStorage.setItem('user', JSON.stringify(localUser));
            console.log("user stored in localStorage: OK");
            navigate('/');
        }
        catch (error) {
            if (error.code === "auth/email-already-in-use") {
                alert("The email address is already in use");
            } else if (error.code === "auth/invalid-email") {
                alert("The email address is not valid.");
            } else if (error.code === "auth/operation-not-allowed") {
                alert("Operation not allowed.");
            } else if (error.code === "auth/weak-password") {
                alert("The password is too weak.");
            }
        }
    }

    return(
        <div className='signUp'>
            <div className="left-panel">
                <div className='content'>
                    <h3>Déjà inscrit ? </h3>
                    <div className="register-button">
                        <button className="btn" onClick={handleClickLogin}>Se connecter</button>
                    </div>
                </div>
                <img className="background" src={ImageFond} alt="Fond"></img>
            </div>
            <div className="right-panel">
                    <h2 className="title">Inscription</h2>
                    <div className='fields'>
                        <form onSubmit={handleSubmit} className='signup-form'>
                            <div className="input-field">
                                <input type="text" placeholder="Prénom" maxLength={20} pattern="[a-zA-Z]+" required value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                            </div>
                            <div className="input-field">
                                <input type="text" placeholder="Nom" maxLength={20}  pattern="[a-zA-Z]+" required value={nom} onChange={(e) => setNom(e.target.value)} />
                            </div>
                            <div className="input-field">
                                <input type="email" placeholder="Mail" required value={email} onChange={(e) => setEmail(e.target.value)} /> {/*pattern="[a-zA-Z]+@[a-z]+\.[a-z]+" */}
                            </div>
                            <div className="input-field">
                                <input type="text" placeholder="Mot de passe" maxLength={20} required value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className='others'>
                                <div className="input-field other">
                                    <input type="number" placeholder="Participation" maxLength={3} min={0} required value={nbParticipation} onChange={(e) => setNbParticipation(e.target.value)} />
                                </div>
                                <div className="input-field other">
                                    <select value={herbergement} onChange={(e) => setHerbergement(e.target.value)} required >
                                        <option value="" disabled hidden>Hebergement ?</option>
                                        <option value="proposer">Proposer</option>
                                        <option value="recherche">Recherche</option>
                                        <option value="rien">Rien</option>
                                    </select>
                                </div>
                            </div>
                            <div className="login-button">
                                <button type="submit" className="btn">S'inscrire</button>
                            </div>
                        </form>
                    </div>             
            </div>
        </div>
    );
}