import React, {useEffect, useState} from 'react';
import classes from './Error.module.css'


const Error = ({children, mode}) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        setShow(true);
    }, [])
    
    return (
        mode === 'error'
            ?
            show &&
                <div className={`${classes.Err} ${classes.Window}`}>
                    <b>{children}</b>
                    <i className="fa-solid fa-xmark" onClick={() => setShow(false)}></i>
                </div>
            :
            show &&
                <div className={`${classes.Sccss} ${classes.Window}`}>
                    <b>{children}</b>
                    <i className="fa-solid fa-xmark" onClick={() => setShow(false)}></i>
                </div>
    );
};

export default Error;