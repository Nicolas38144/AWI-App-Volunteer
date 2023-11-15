import React,{useEffect} from 'react';
import { useNavigate  } from 'react-router-dom';

import Card from '../../components/card/card.js'

import './registerSiteView.css';

export default function RegisterSiteView(props){
    useEffect(() => {},[]);

    const navigate = useNavigate();
    
    const handleClick = () => {

        navigate('/general');
    };

    return(
        <div className='registerSiteView'>
            <h1>RegisterView</h1>
            <Card handleClick={handleClick}></Card>
        </div>
    );
}