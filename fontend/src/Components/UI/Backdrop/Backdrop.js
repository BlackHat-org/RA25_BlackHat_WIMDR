import React from 'react';
import classes from './Backdrop.module.css';
const Backdrop =(props) =>{
    return props.show ? <div className={classes.Backdrop} onClick={props.modalclosed}></div> : null
}

export default Backdrop;