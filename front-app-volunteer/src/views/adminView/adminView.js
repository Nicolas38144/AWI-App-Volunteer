import React,{useEffect, useState} from 'react';

import './adminView.css';

export default function AdminView(props){
    useEffect(() => {},[]);

    const [activeTab, setActiveTab] = useState(null);

    const handleTabChange = (tab) => { setActiveTab(tab); };

    return(
        <div className='adminView'>
            <h1>AdminView</h1>

            <button type='button' className='updateBtn' onClick={() => handleTabChange('horaires')}>Choix des horaires</button>
            {activeTab === 'horaires' && <h2>Choix des horaires</h2>}

            <button type='button' className='updateBtn' onClick={() => handleTabChange('roles')}>Modifier les rôles</button>
            {activeTab === 'roles' && <h2>Choix des horaires</h2>}

            <button type='button' className='updateBtn' onClick={() => handleTabChange('festival')}>Créer un festival</button>
            {activeTab === 'festival' && <h2>Création de festival</h2>}
        </div>
    );
}