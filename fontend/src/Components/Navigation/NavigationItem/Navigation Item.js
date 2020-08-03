import React from 'react';
import NavigationItems from '../NavigationItem/NavigationItems/NavigationItems';
import classes from './NavigationItem.module.css';
import Logo from '../../../Assets/image/logo-blue.png';

const NavigationItem =(props) =>{
  return(
    <div className={classes.NavigationItem}>
      <img src ={Logo} className={classes.logo} alt='Logo' />
      <NavigationItems type='' link='/'>HOME</NavigationItems>
      {(props.isAuth && (props.status || props.Info)) 
      ? <NavigationItems type='' link='/personalinfo'>PERSONAL INFO</NavigationItems> : null}
      <NavigationItems type='true'><button style={{backgroundColor: 'black', border: 'none',color: 'white',fontWeight: 'bold'}} onClick={()=> window.open(link, "_blank")}>ADMIN LOGIN</button></NavigationItems>
      {!props.isAuth
       ?<NavigationItems type='' link='/register'>REGISTER</NavigationItems>
       : <NavigationItems type='' link='/logout'>LOGOUT</NavigationItems>}
    </div>
  )
}

export default NavigationItem;