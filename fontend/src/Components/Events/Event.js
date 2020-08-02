import React from 'react';
import classes from './Event.module.css';
const Event = (props) =>{
    let link = 'http://maps.google.com/?q=' + props.latitude + ',' + props.longitude
    return(
        <div>
            {props.latitude ?<div className = {classes.Event2}>
                <br />
                <p className={classes.Para2}>An Accident occurs</p>
                <p className={classes.Para2}>Please Click this button to get the location.</p>
                <button onClick={()=> window.open(link, "_blank")}>Click</button>
                <br />
            </div>
             :<div className = {classes.Event1}>
            <br />
            <p className={classes.Para1}>No Event</p>
            <p className={classes.Para1}>Everything is fine</p>
            <br />
            </div>}
        </div>
    )
}
export default Event;