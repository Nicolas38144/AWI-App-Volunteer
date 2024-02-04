import React, { useEffect, useState } from 'react';
//import { db, auth } from '../../../firebase';
//import { doc, setDoc, getDoc } from "firebase/firestore";

import './flexibiliteView.css';

export default function FlexibiliteView(props){

    const users = props.listUser;
    const [usersFlexibles, setUsersFlexibles] = useState([])




    useEffect(() => {
        
    }, []);

    return(
        <div className='flexibiliteView'>
            <h2>Gestion des flexibilités</h2>
            
        </div>
    );
}