import React from 'react';
import classes from './Toggle.module.scss'

const Toggle = ({props, text, status}) => {
    return (
        <label>
            {status === "checked"
                ? <input type="checkbox" checked className={classes.Tggl} {...props} />
                : <input type="checkbox" className={classes.Tggl} {...props} />
            }
            <span className={classes.TgglTxt}>{text}</span>
        </label>
    );
};

export default Toggle;