import React,{useEffect} from 'react';

import './loginView.css';
import TextField from '../../components/textField/textField';

export default function LoginView(props){
    useEffect(() => {},[]);
    //ajoute une fonction add


    return(
        <div className='loginview'>
            <TextField></TextField>
        </div>
    );
}