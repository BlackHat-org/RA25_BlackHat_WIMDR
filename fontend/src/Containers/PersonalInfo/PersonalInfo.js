 import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Img from '../../Assets/image/user4.png';
import Event from '../../Components/Events/Event';
import * as actions from '../../Store/Action/index';
import classes from './PersonalInfo.module.css';
import Spinner from '../../Components/UI/Spinner/Spinner';
import Modal from '../../Components/Modal/Modal';
import GaugeChart from 'react-gauge-chart';
import ProgressBar from 'react-bootstrap/ProgressBar';
class PersonalInfo extends Component {
    state = {
        ShowModal : false,
        latitude: null,
        longitude: null
    }
    componentDidMount(){
        if(this.props.IsAuthenticated && (this.props.status || this.props.Info)){
        this.props.onFetchData(this.props.token,this.props.userId);
        this.props.spinnerHide();
    }
}
  ShowProfile =(identifier,ShowDetails) =>{
      return <span>
      <h3 style={{fontWeight:'700!important'}}>{identifier} :-</h3> 
      <p>{ShowDetails[0][identifier]}</p>
      </span>
  }
  onClickHandler = (ShowDetails) =>{
      this.setState(prev =>{
          return {ShowModal: !prev.ShowModal}
      })
      this.setState({latitude: ShowDetails[0]['latitude'],longitude: ShowDetails[0]['longitude']})
           
    }
    RandomForFuel = (max,min) =>{
        return Math.random() * (max - min) + min;
    }
    RandomForPollution = (max,min) =>{
        return Math.random() * (max - min) + min;
    }
    render(){
        let Navigate = null;
        if(!this.props.IsAuthenticated){
           Navigate = <Redirect to='/'/>
        }
        let ShowDetails =  this.props.userDetails;
            let Show= <Spinner />;
            let disable = false
        if(ShowDetails){
              Show = <div className={classes.Info}>
                       {this.ShowProfile('UserName',ShowDetails)}
                       {this.ShowProfile('Email',ShowDetails)}
                       {this.ShowProfile('CarNo',ShowDetails)}
                       {this.ShowProfile('AdhaarNo',ShowDetails)}
                       {this.ShowProfile('PersonalMobile',ShowDetails)}
                       {this.ShowProfile('RelativeMobile1',ShowDetails)}
                       {this.ShowProfile('RelativeMobile2',ShowDetails)}
                       {this.ShowProfile('RegistrationDate',ShowDetails)}
                       <span>
                   <h3 style={{fontWeight:'700!important'}}>Fuel Remaining :-</h3>
                          <GaugeChart id="gauge-chart5"
                   nrOfLevels={420}
                    arcsLength={[0.3, 0.5, 0.2]}
                  colors={['#EA4228', '#F5CD19','#5BE12C' ]}
                   percent={this.RandomForFuel(0,1)}
                   arcPadding={0.02}
                    textColor= {'black'}
                     hideText ={true}
                        style = {{height: '20%',width: '30%',marginTop: '-70px'}}/>
                   </span>
                   <span>
                       <h3 style={{fontWeight:'700!important'}}>Pollution level:-</h3>
                       {/* Apply ProgressBar here */}
                          </span>
                     </div>
                     disable = true;
                  
            }
            let ModalShow = <div className={classes.DetailsContainer}>
            <img src={Img} alt='example' className={classes.Img}/>
              {Show}
              <button 
              className={classes.Button} 
              onClick={() =>this.onClickHandler(this.props.userDetails)}
              disabled={!disable}>
                  Click to see Event
                  </button>
           </div>
            if(this.state.ShowModal){
            ModalShow = <span>
                            <Modal show={true} modalclosed ={() =>this.onClickHandler(this.props.userDetails)}>
                                 <Event latitude={this.state.latitude} longitude={this.state.longitude}/>
                            </Modal>
                          </span>
            }
 
        return(
            <div className={classes.PersonalInfo}>
                   {ModalShow}
            {Navigate}
             </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return{
       IsAuthenticated: state.TokenID !== null,
       token: state.TokenID,
       userId: state.UserID,
       userDetails: state.RegistrationForm,
       status: state.status,
       Info: state.Info
  }
}
  const mapDispatchToProps =(dispatch) =>{
    return{
        onFetchData : (token,userId) => dispatch(actions.fetchData(token,userId)),
        spinnerHide: () => dispatch(actions.hideSpinner())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(PersonalInfo);
