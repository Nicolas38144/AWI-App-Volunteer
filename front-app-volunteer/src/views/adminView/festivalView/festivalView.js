import React, { useEffect, useState } from 'react';
// import { db, auth } from '../../../firebase';
// import { doc, getDoc } from "firebase/firestore";

import './festivalView.css';

export default function FestivalView(props){
    useEffect(() => {
        setErreur('')
    },[]);

    const [erreur, setErreur] = useState('');

    // date d'aujourd'hui
    let ajd = new Date();

    const create_festival = async (formData) => { 
        let datedebut = new Date(formData.startDate)
        let datefin = new Date(formData.endDate)
        if (datedebut < ajd || datefin<ajd){
            setErreur('Veuillez saisir une date ultérieure à aujourdhui')
        // au cas ou c'est que samedi
        // } else if (dateselect.getDay()!==6){
        //    seterreur('Veuillez choisir un samedi')
        } else if (datedebut>datefin){
            setErreur('Les dates ne concordent pas')
        } else {
            try {

                const nvfestival = {
                    date_debut: datedebut,
                    date_fin: datefin,
                    annee: datedebut.getFullYear(),
                  };

                console.log(nvfestival)
                //await db.collection('festival').add(nvfestival);
          
                console.log('Festival créé');
              } catch (error) {
                console.error('Erreur bdd :', error);
              }
        }
        
    }

    const [formData, setFormData] = useState({
        startDate: new Date(),
        endDate: new Date()
    });
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // if (activeTab === 'festival'){ create_festival(formData); }
        create_festival(formData);
    };

    return(
        <div className='festivalView'>
            <h2>Création de festival</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Date de début :</label>
                    <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    />
                    <label>Date de fin :</label>
                    <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                    />
                </div>
                <button type="submit">Soumettre</button>
                <p className='error'>{erreur}</p>
            </form>
        </div>
    );
}