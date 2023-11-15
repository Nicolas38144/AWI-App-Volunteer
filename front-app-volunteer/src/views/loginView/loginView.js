import React,{useEffect} from 'react';
import { useNavigate  } from 'react-router-dom';

import Card from '../../components/card/card.js'

import './loginView.css';

export default function LoginView(props){
    useEffect(() => {},[]);

    const navigate = useNavigate();
    
    const handleClick = () => {

        navigate('/general');
    };

    return(
        <div className='loginView'>
            <h1>LoginView</h1>
            <Card handleClick={handleClick}></Card>
        </div>
    );
}