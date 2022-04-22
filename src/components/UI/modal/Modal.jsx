import React from 'react';
import classes from './Modal.module.css'
import { GrFormClose } from 'react-icons/gr'


const Modal = ({title, children, visible, setVisible}) => {

    const rootClasses = [classes.Modal]
    if (visible) {
        rootClasses.push(classes.active)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={classes.ModalContent} onClick={(e) => e.stopPropagation()}>
                <div className={classes.title}>
                    {title}
                    <GrFormClose onClick={() => setVisible(false)} className={classes.close}/>
                </div>

                {children}
            </div>
        </div>
    );
};

export default Modal;