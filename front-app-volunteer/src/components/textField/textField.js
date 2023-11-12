import React, {useState} from 'react';
import './textField.css'; // Importer le fichier CSS
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';


export default function textField() {

    const CssTextField = styled(TextField)({
        '& label.Mui-focused': {
          color: '#002663',
        },
        '& label': {
            color: '#4C5CC5',
          },
        '& .MuiInput-underline:after': {
          borderBottomColor: '#4C5CC5',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#4C5CC5',
          },
          '&:hover fieldset': {
            borderColor: '#4C5CC5',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#002663',
          },
        },
      });

  return (
    <div className='TextField'>
        <CssTextField />
    </div>
  );
}