import React from 'react';
import classes from './Toggle.module.scss'

const Toggle = ({props, text, status, change}) => {
    return (
        <label>
            {status === "checked"
                ? <input type="checkbox" onChange={change} defaultChecked className={classes.Tggl} {...props} />
                : <input type="checkbox" onChange={change} className={classes.Tggl} {...props} />
            }
            <span className={classes.TgglTxt}>{text}</span>
        </label>
    );
};

export default Toggle;