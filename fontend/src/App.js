import React,{Component} from 'react';
import './App.css';
import Home from './Containers/Homepage/Home';
import Logout from './Containers/Logout/Logout';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Layout from './Hoc/Layout/Layout';
import Register from './Containers/Registration/Registration';
import PersonalInfo from './Containers/PersonalInfo/PersonalInfo';
import * as actions from './Store/Action/index';

class App extends Component{
  componentDidMount(){
    this.props.onTryAutoSignUp()
  }
  render(){
  return (
    <div className="App">
      <Layout>
       <Route path='/' exact component={Home} />
       <Route path='/register' exact component={Register} />
       <Route path='/personalinfo' exact component={PersonalInfo} />
       <Route path='/logout' exact component={Logout} />
     </Layout>
    </div>
  );
}
}
const mapToDispatch =(dispatch) =>{
  return{
    onTryAutoSignUp : () => dispatch(actions.authCheckState())
  }
 }
export default connect(null,mapToDispatch)(App);
