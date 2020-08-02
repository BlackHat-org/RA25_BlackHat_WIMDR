import React from 'react';
import NavigationItems from '../NavigationItem/NavigationItems/NavigationItems';
import classes from './NavigationItem.module.css';
import Logo from '../../../Assets/image/logo-blue.png';

const NavigationItem =(props) =>{
  return(
    <div className={classes.NavigationItem}>
      <img src ={Logo} className={classes.logo} alt='Logo' />
      <NavigationItems link='/'>HOME</NavigationItems>
      {(props.isAuth && (props.status || props.Info)) 
      ? <NavigationItems link='/personalinfo'>PERSONAL INFO</NavigationItems> : null}
      {!props.isAuth
       ?<NavigationItems link='/register'>REGISTER</NavigationItems>
       : <NavigationItems link='/logout'>LOGOUT</NavigationItems>}
    </div>
  )
}

export default NavigationItem;