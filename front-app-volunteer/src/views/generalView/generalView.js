import React,{useEffect} from 'react';
import { useNavigate  } from 'react-router-dom';
import NavBar from '../../components/navBar/navBar'
import Button from '../../components/button/button'


import './generalView.css';

export default function GeneralView(props){
    useEffect(() => {},[]);

    const navigate = useNavigate();

    const handleLogoutClick = () => {
        navigate('/');
    };

    return(
        <div className='generalView'>
            <div>
            <NavBar hasReceivedMessages={true} hasNews={false} />
            </div>
            <div className="logout-button">
                <Button 
                    text="Se déconnecter" 
                    textColor="white"
                    bgColor="#002663"
                    handleClick={handleLogoutClick}
                    >
                </Button>
            </div> 
        </div>
    );
}
