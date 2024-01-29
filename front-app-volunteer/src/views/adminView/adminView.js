import React,{useEffect, useState} from 'react';

import './adminView.css';

export default function AdminView(props){
    useEffect(() => {},[]);

    const [activeTab, setActiveTab] = useState(null);

    const handleTabChange = (tab) => { setActiveTab(tab); };
    const [erreur, seterreur] = useState('');

    // date d'aujourd'hui
    let ajd = new Date();

    const create_festival = (formData) => { 
        let dateselect = new Date(formData.startDate)
        if (dateselect < ajd){
            seterreur('Veuillez saisir une date ultérieure à aujourdhui')
        } else if (dateselect.getDay()!==6){
            seterreur('Veuillez choisir un samedi')
        } else {
            // TODO
        }
        
    }

        const [formData, setFormData] = useState({
            startDate: new Date(),
        });
    
    const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (activeTab === 'festival'){create_festival(formData);}
       
    };

    return(
        <div className='adminView'>
            <h1>AdminView</h1>

            <button type='button' className='updateBtn' onClick={() => handleTabChange('horaires')}>Choix des horaires</button>
            {activeTab === 'horaires' && <h2>Choix des horaires</h2>}

            <button type='button' className='updateBtn' onClick={() => handleTabChange('roles')}>Modifier les rôles</button>
            {activeTab === 'roles' && <h2>Choix des horaires</h2>}

            <button type='button' className='updateBtn' onClick={() => { handleTabChange('festival'); seterreur('')}}>Créer un festival</button>
            {activeTab === 'festival' && <div><h2>Création de festival</h2>
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
            </div>
            <button type="submit">Soumettre</button>
            <p className='error'>{erreur}</p>
            </form></div>}
        </div>
    );
}