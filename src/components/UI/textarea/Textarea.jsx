import React from 'react';
import classes from './Textarea.module.scss'

const Textarea = (props) => {
    return (
        <textarea className={classes.Txtr} {...props}>

        </textarea>
    );
};

export default Textarea;