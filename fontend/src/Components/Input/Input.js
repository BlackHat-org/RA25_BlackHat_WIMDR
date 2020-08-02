import React from 'react';
import classes from './Input.module.css';

const Input =(props) =>{
    let Inputelement= null;
   
    const Inputclasses= [classes.InputElement];
   
    if(props.invalid && props.touched){
        Inputclasses.push(classes.Invalid);
    }
    
    Inputelement= <input 
                   {...props.EleConfig} 
                   value={props.value} 
                   className={Inputclasses.join(' ')}
                   onChange = {props.changed}/>
    return(
       <div className={classes.Input}>
         <label className={classes.Label}>{props.label}</label>
         {Inputelement}
       </div>
    )
}
export default Input;