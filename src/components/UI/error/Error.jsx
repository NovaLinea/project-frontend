import React, {useEffect, useState} from 'react';
import classes from './Error.module.css'
import { GrFormClose } from 'react-icons/gr'


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
                    <GrFormClose onClick={() => setShow(false)} className={classes.closeErr}/>
                </div>
            :
            show &&
                <div className={`${classes.Sccss} ${classes.Window}`}>
                    <b>{children}</b>
                    <GrFormClose onClick={() => setShow(false)} className={classes.closeSccss}/>
                </div>
    );
};

export default Error;