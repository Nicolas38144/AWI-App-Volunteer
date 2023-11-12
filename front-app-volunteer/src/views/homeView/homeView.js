import React,{useEffect} from 'react';
import NavBar from '../../components/navBar/navBar.js';

import './homeView.css';

export default function HomeView(props){
    useEffect(() => {},[]);

    return(
        <div className='homeView'>
            <NavBar />
            <h1>HomeView</h1>
        </div>
    );
}