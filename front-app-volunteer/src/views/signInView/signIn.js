import React,{useEffect, useState} from 'react';
import { useNavigate  } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { addDoc, doc, getDoc, collection } from "firebase/firestore";
import { signInWithEmailAndPassword } from 'firebase/auth';
// import jsonData from '../../components/awi_games.json';

import './signIn.css';
import ImageFond from '../../images/logo31_couleur.png';

export default function SignIn(props){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const handleClickRegister = () => { navigate('/register'); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged : OK");

            const uid = userCredential.user.uid;
            console.log("get uid : OK");

            const userDocRef = doc(db, 'users', uid);
            const docSnap = await getDoc(userDocRef);
            var user = {};
            if (docSnap.exists()) {
                const dataUser = docSnap.data();
                user = {
                    uid: uid,
                    prenom: dataUser.prenom,
                    nom: dataUser.nom,
                    email: dataUser.email,
                    nbParticipation: dataUser.nbParticipation,
                    herbergement: dataUser.herbergement,
                };
            } else {
                console.log("No such document!");
            }
            
            localStorage.setItem('token', userCredential.user.accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            console.log("user stored in localStorage: OK");


            //add games
            /*const myCollection = collection(db, 'games');
            var game = {};
            for (let i=1; i<jsonData.length; i++) {
                game = {
                    Nom_jeu: jsonData[i].Nom_jeu,
                    Editeur: jsonData[i].Editeur,
                    Type: jsonData[i].Type,
                    Notice: jsonData[i].Notice,
                    Zone_plan: jsonData[i].Zone_plan,
                    Zone_benevole: jsonData[i].Zone_benevole,
                    A_animer: jsonData[i].A_animer,
                    Recu: jsonData[i].Recu,
                    Video: jsonData[i].Video
                }
                const newDocRef = await addDoc(myCollection, game);
            }
            console.log("Games stored in db : OK");               
            */
            navigate('/');
        }
        catch (err) {
            console.log(err);
        }
    }

    return(
        <div className='signIn'>
            <div className="left-panel">
                <div className='content'>
                    <h3>Nouveau ici ?</h3>
                    <div className="register-button">
                        <button className="btn" onClick={handleClickRegister}>S'inscrire</button>
                    </div>
                </div>
                <img className="background" src={ImageFond} alt="Fond"></img>
            </div>
            <div className="right-panel">
                    <h2 className="title">Se connecter</h2>
                    <div className='fields'>
                        <form onSubmit={handleSubmit} className='signin-form'>
                            <div className="input-field">
                                <input type="email" placeholder="Mail" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="input-field">
                                <input type="password" placeholder="Mot de passe" required value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="login-button">
                                <button type="submit" className="btn">Connexion</button>
                            </div>
                        </form>
                    </div>             
            </div>
        </div>
    );
}