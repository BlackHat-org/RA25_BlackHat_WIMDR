import React from 'react';
import classes from './Event.module.css';
import accImg from '../../Assets/image/accident1.jpg';
import noImg from '../../Assets/image/smiley.png';
const Event = (props) =>{
    let link = 'http://maps.google.com/?q=' + props.location
    return(
        <div>
            {props.latitude ?<div className = {classes.Event2}>
                <br />
                <img src ={accImg} className={classes.accident} alt='Logo'/>
                <p className={classes.Para2}>An Accident occurs</p>
                <p className={classes.Para2}>Please Click this button to get the location.</p>
                <button onClick={()=> window.open(link, "_blank")}>Click</button>
                <br />
            </div>
             :<div className = {classes.Event1}>
            <br />
            <img src ={noImg} className={classes.accident} alt='Logo'/>
            <p className={classes.Para1}>No Event</p>
            <p className={classes.Para1}>Everything is fine</p>
            <br />
            </div>}
        </div>
    )
}
export default Event;