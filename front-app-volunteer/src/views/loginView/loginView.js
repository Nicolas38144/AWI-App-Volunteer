import React,{useEffect} from 'react';
import { useNavigate  } from 'react-router-dom';

import Card from '../../components/card/card.js'

import './loginView.css';

export default function LoginView(props){
    useEffect(() => {},[]);

    const navigate = useNavigate();
    
    const handleLoginClick = () => {
        navigate('/genaral');
    };

    return(
        <div className='loginview'>
            <h1>LoginView</h1>
            <Card onClick={handleLoginClick}></Card>
        </div>
    );
}