import React,{useEffect} from 'react';
import { useNavigate  } from 'react-router-dom';
import NavBar from '../../components/navBar/navBar'
import Button from '../../components/button/button'


import './generalView.css';

export default function GeneralView(props){
    useEffect(() => {},[]);

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    return(
        <div className='generalView'>
            <div>
                <NavBar></NavBar>
            </div>
            <div className="logout-button">
                <Button 
                    text="Se déconnecter" 
                    textColor="white"
                    bgColor="#002663"
                    onClick={handleLoginClick}
                    >
                </Button>
            </div> 
        </div>
    );
}
