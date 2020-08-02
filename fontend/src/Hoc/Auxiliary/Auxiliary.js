import React from 'react';
import classes from './Auxiliary.module.css';

const Aux =(props) =>{
    return <div className={classes.Aux}>
            {props.children}
           </div> 
}

export default Aux;