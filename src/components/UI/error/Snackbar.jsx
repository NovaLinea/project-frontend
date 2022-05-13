import React, { forwardRef, useImperativeHandle } from 'react';
import classes from './Snackbar.module.scss'
import { GrFormClose } from 'react-icons/gr'


const Snackbar = forwardRef((props, ref) => {
    const [show, setShow] = React.useState(false);
    const timeout = 5000;

    useImperativeHandle(ref, () => ({
        show() {
            setShow(true);
            setTimeout(() => {
                setShow(false)
            }, timeout)
        }
    }));
    
    return (
        show &&
            <div
                className={classes.snackbar}
                id={props.mode === "error" ? classes.error : classes.success}
            >
                <div className={classes.message}>{props.message}</div>
                <GrFormClose onClick={() => setShow(false)} className={classes.close}/>
            </div>
    );
})

export default Snackbar;