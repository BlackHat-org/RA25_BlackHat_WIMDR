import React from 'react';
import classes from './DrawerToggle.module.css';
const Drawertoggle =(props)=>(
    <div className={classes.DrawerToggle} onClick={props.change}>
       <div></div>
       <div></div>
       <div></div>
    </div>
)
export default Drawertoggle;