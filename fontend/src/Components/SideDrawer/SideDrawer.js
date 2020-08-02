import React from 'react';
import classes from './SideDrawer.module.css';
import Backdrop from '../UI/Backdrop/Backdrop';
import Navigationitem from '../Navigation/NavigationItem/Navigation Item';

const SideDrawer =(props) =>{
    let Sidedrawerstate=[classes.Sidedrawer,classes.Open]
    if(!props.show){
       Sidedrawerstate=[classes.Sidedrawer,classes.Close]
    }
    return(
        <div>
            <Backdrop show={props.show} modalclosed={props.closed}/>
            <div className={Sidedrawerstate.join(' ')} onClick={props.closed}>
                <ul>
                <Navigationitem 
                isAuth = {props.IsAuth}
                status = {props.status}
                Info = {props.Info}/>
                </ul>
        </div>
        </div>
    )
}
export default SideDrawer;