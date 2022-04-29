import React from 'react';
import classes from './Input.module.scss'

const Input = (props) => {
    return (
      <input className={classes.Inpt} {...props}/>
    );
};

export default Input;