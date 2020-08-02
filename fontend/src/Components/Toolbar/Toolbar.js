import React from 'react';
import classes from './Toolbar.module.css';
import NavigationItem from '../Navigation/NavigationItem/Navigation Item';
import Drawer from '../SideDrawer/DrawerToggle/DrawerToggle';

const Tool =(props) =>{
    // let query= props.location.search;
    // let querypass = null;
    // if(query){
    //     querypass = query;
    // }
  return(
    <div className={classes.Toolbar}>
        <Drawer show={props.show} change={props.changed}/>
     <nav className={classes.Desktop}>
       <NavigationItem 
       isAuth = {props.IsAuth}
       status = {props.status}
       Info = {props.Info}/>
       </nav>
    </div>
)
  }
export default Tool;