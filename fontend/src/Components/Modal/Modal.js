import React from 'react';
import Backdrop from '../UI/Backdrop/Backdrop';
import classes from './Modal.module.css';
const Modal = (props) =>{
    return(
        <div>
            <Backdrop show={props.show} modalclosed={props.modalclosed} />
             <div className={classes.Modal}
        style={{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? '1' : '0',
            backgroundColor: 'white',padding:'0px'
        }}>
            {props.children}
        </div>
        </div>
    )
}
export default Modal;