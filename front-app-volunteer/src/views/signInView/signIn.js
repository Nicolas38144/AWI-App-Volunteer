import React,{useState} from 'react';
import { useNavigate  } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { doc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from 'firebase/auth';

import './signIn.css';
import ImageFond from '../../images/logo31_couleur.png';

export default function SignIn(props){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const handleClickRegister = () => { navigate('/register'); };

     // Fonction pour définir un cookie qui expire en 1 jour
     function setCookie(name, value) {
        const expires = new Date();
        expires.setTime(expires.getTime() + 1 * 24 * 60 * 60 * 1000); // 1 jour
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // console.log("User logged : OK");

            const uid = userCredential.user.uid;
            // console.log("get uid : OK");

            const userDocRef = doc(db, 'users', uid);
            const docSnap = await getDoc(userDocRef);
            var user = {};
            if (docSnap.exists()) {
                const dataUser = docSnap.data();
                user = {
                    prenom: dataUser.prenom,
                    nom: dataUser.nom,
                    email: dataUser.email,
                    nbParticipation: dataUser.nbParticipation,
                    hebergement: dataUser.hebergement,
                    pseudo: dataUser.pseudo,
                    adresse:dataUser.adresse,
                    tel:dataUser.tel,
                    jeuPrefere: dataUser.jeuPrefere,
                    role: dataUser.role,
                };
            } else {
                console.log("No such document!");
            }
            
            localStorage.setItem('token', userCredential.user.accessToken);
            setCookie('token',userCredential.user.accessToken)
            localStorage.setItem('user', JSON.stringify(user));
            // console.log("user stored in localStorage: OK");
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