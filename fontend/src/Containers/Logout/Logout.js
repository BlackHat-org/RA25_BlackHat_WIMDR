import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../Store/Action/index';

class Logout extends Component{
    componentDidMount(){
        this.props.onLogout();
    }
    render(){
        return(
     <Redirect to="/" />
        )
    }
}
const mapStateToDispatch =(dispatch) =>{
    return{
      onLogout: () => dispatch(actions.logOut())
    }
}
export default connect(null,mapStateToDispatch)(Logout);