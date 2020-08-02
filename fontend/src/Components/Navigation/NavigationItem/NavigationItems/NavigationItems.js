import React from 'react';
import classes from './NavigationItems.module.css';
import {NavLink} from 'react-router-dom';

const NavigationItems =(props) =>{
    return(
        <div className={classes.Navigationitem}>
          <li>
      <NavLink to={props.link} exact activeClassName={classes.active}>{props.children}</NavLink>
      </li>
      </div>
    )
}
export default NavigationItems;