import React,{ useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { createUserWithEmailAndPassword } from 'firebase/auth';

import './signUp.css';
import ImageFond from '../../images/logo31_couleur.png';

export default function SignUp(props){
    const [users, setUsers] = useState([])
    useEffect(() => {
        getUsers();
    },[]);

    const navigate = useNavigate();
    const handleClickLogin = () => { navigate('/login'); };
    
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [nbParticipation, setNbParticipation] = useState('');
    const [hebergement, setHebergement] = useState('');

    // Fonction pour définir un cookie qui expire en 1 jour
    function setCookie(name, value) {
        const expires = new Date();
        expires.setTime(expires.getTime() + 1 * 24 * 60 * 60 * 1000); // 1 jour
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }

    const getUsers = async (e) => {
        const col = collection(db, "users");
        const snapshot = await getDocs(col);
        var listUsers = [];
        snapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data().prenom, doc.data().nom);
            listUsers.push([doc.data().prenom, doc.data().nom])
        });
        setUsers(listUsers);
    }

    const setPseudo = (prenom1, nom1) => {
        var count = 0;
        for (let i=0; i<users.length; i++) {
            if (users[i][0] === prenom1 && users[i][1] === nom1) {
                count++;
            }
        }
        return prenom1+'.'+nom1+count;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (password === password2) {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                // console.log("User created : OK");
    
                const uid = userCredential.user.uid;
                // console.log("get uid : OK");
    
                const pseudo = setPseudo(prenom, nom);
                const userDocRef = doc(db, 'users', uid);
                const user = {
                    prenom: prenom,
                    nom: nom,
                    email: email,
                    pw: password,
                    nbParticipation: nbParticipation,
                    hebergement: hebergement,
                    pseudo: pseudo,
                    adresse:'',
                    tel:'',
                    role: 'benevole',
                    jeuPrefere: '',
                };
                const { pw, ...localUser } = user; 
                await setDoc(userDocRef, user );
                // console.log("user stored in db: OK");
    
                
                localStorage.setItem('token', userCredential.user.accessToken);
                setCookie('token',userCredential.user.accessToken)
                localStorage.setItem('user', JSON.stringify(localUser));
                // console.log("user stored in localStorage: OK");
                navigate('/');
            }
            else {
                alert("Les mots de passe ne correspondent pas");
            }
        }
        catch (error) {
            if (error.code === "auth/email-already-in-use") {
                alert("L'adresse email est déjà utilisée");
            } else if (error.code === "auth/invalid-email") {
                alert("L'adresse email n'est pas valide.");
            } else if (error.code === "auth/operation-not-allowed") {
                alert("L'opération n'est pas permise.");
            } else if (error.code === "auth/weak-password") {
                alert("Le mot de passe est trop petit.");
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
                                <input type="password" placeholder="Mot de passe" maxLength={20} required value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="input-field">
                                <input type="password" placeholder="Confirmer le mot de passe" maxLength={20} required value={password2} onChange={(e) => setPassword2(e.target.value)} />
                            </div>
                            <div className='others'>
                                <div className="input-field other">
                                    <input type="number" placeholder="Participation" maxLength={3} min={0} required value={nbParticipation} onChange={(e) => setNbParticipation(e.target.value)} />
                                </div>
                                <div className="input-field other">
                                    <select value={hebergement} onChange={(e) => setHebergement(e.target.value)} required >
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