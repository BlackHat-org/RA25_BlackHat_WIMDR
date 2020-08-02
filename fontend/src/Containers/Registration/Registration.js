import React,{Component} from 'react';
import classes from './Registration.module.css';
import Input from '../../Components/Input/Input';
import Aux from '../../Hoc/Auxiliary/Auxiliary';
import * as actions from '../../Store/Action/index';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import Spinner from '../../Components/UI/Spinner/Spinner';
import Backdrop from '../../Components/UI/Backdrop/Backdrop';

class Register extends Component {
    state={
        RegisterationForm: {
            UserName:{
                EleConfig:{
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                label: 'User NAME',
                validation:{
                    required: true,
                    isName: true
                },
               valid: false,
               touched: false
            },
            Email:{
                EleConfig:{
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                label: 'EMAIL ADDRESS',
                validation:{
                    required: true,
                    isEmail: true
                },
               valid: false,
               touched: false
            },
            password:{
                EleConfig:{
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                label: 'PASSWORD',
                validation:{
                    required: true,
                    minLength: 8
                },
               valid: false,
               touched: false
            },
            PersonalMobile:{
                EleConfig:{
                    type: 'text',
                    placeholder: 'Your Personal Number'
                },
                value: '',
                label: 'PERSONAL NO.',
                validation:{
                    required: true,
                    exactLength: 10,
                    isNumeric: true
                },
               valid: false,
               touched: false
            },
            RelativeMobile1:{
                EleConfig:{
                    type: 'text',
                    placeholder: 'Relative Number'
                },
                value: '',
                label: 'FIRST RELATIVE NO.',
                validation:{
                    required: true,
                    exactLength: 10,
                    isNumeric: true
                },
               valid: false,
               touched: false
            },
            RelativeMobile2:{
                EleConfig:{
                    type: 'text',
                    placeholder: 'Relative Number'
                },
                value: '',
                label: 'SECOND RELATIVE NO.',
                validation:{
                    required: true,
                    exactLength: 10,
                    isNumeric: true
                },
               valid: false,
               touched: false
            },
            AdhaarNo:{
                EleConfig:{
                    type: 'text',
                    placeholder: 'Your Adhaar Number'
                },
                value: '',
                label: 'ADHAAR NO.',
                validation:{
                    required: true,
                    exactLength: 12,
                    isNumeric: true
                },
               valid: false,
               touched: false
            },
            CarNo:{
                EleConfig:{
                    type: 'text',
                    placeholder: 'CarNumber:- CG 04 MG 7788'
                },
                value: '',
                label: 'CAR NO.',
                validation:{
                    required: true,
                    car: true
                },
               valid: false,
               touched: false
            }
        },
        formIsvalid: false,
        Isignup: false
    }
    CheckValidity =(rules, value) =>{
          let isValid =true;
          if(!rules){
              return true;
          }
          if(rules.required){
              isValid= value.trim() !== '' && isValid;
          }
          if(rules.minLength){
              isValid = value.length >= rules.minLength  && isValid;
          }
          if(rules.exactLength){
              isValid = value.length === rules.exactLength && isValid;
          }
          if(rules.isEmail){
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid 
          }
          if(rules.isNumeric){
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
          }
          if(rules.car){
            const pattern = /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/;
            isValid = pattern.test(value) && isValid
          }
          if(rules.isName){
              const pattern = /[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/;
              isValid = pattern.test(value) && isValid
          }
          
          return isValid;
    }
    

    InputHandler =(event, Identifier) =>{
         const UpdatedForm = {...this.state.RegisterationForm}
         const UpdatedEle = {...UpdatedForm[Identifier]}
         UpdatedEle.value = event.target.value;
         UpdatedEle.valid = this.CheckValidity(UpdatedEle.validation, UpdatedEle.value);
         UpdatedEle.touched = true;
         UpdatedForm[Identifier] = UpdatedEle;
         let formIsvalid = true;
         for(let inputs in UpdatedForm){
             formIsvalid = UpdatedForm[inputs].valid && formIsvalid;
         }
         this.setState({RegisterationForm: UpdatedForm, formIsvalid: formIsvalid});
    }
   
    OnSignHandler =(event) =>{
        event.preventDefault();
        let RegDet = {};
        for(let data in this.state.RegisterationForm){
            if(data !== 'password'){
                RegDet[data] = this.state.RegisterationForm[data].value;
            }
        }
        const email = this.state.RegisterationForm['Email'].value;
        const password = this.state.RegisterationForm['password'].value;
        const Issignup = this.state.Isignup;
        this.props.onSubmit(email,password,Issignup,RegDet);
       
    }
    Toggle =()=>{
        this.setState(prev =>{
            return {Isignup: !prev.Isignup}
        })
    }
    render(){
        let Navigate = null;
        if(this.props.IsAuthenticated && (this.props.status || this.props.Info)){
            Navigate= <Redirect to='/personalinfo' />;
    }
          let ExtractedForm = [];
          for(let inputs in this.state.RegisterationForm){
              ExtractedForm.push({
                  id: inputs,
                  Elements: this.state.RegisterationForm[inputs]
              });
          }
          let Form = <form onSubmit={this.OnSignHandler}>
                    {ExtractedForm.map(data =>{
                        return <Input 
                          key = {data.id}
                          EleConfig = {data.Elements.EleConfig}
                          value = {data.Elements.value}
                          label = {data.Elements.label}
                          changed = {(event) => this.InputHandler(event,data.id)}
                          invalid = {!data.Elements.valid}
                          touched = {data.Elements.touched} />
                    })}
                    <button className={classes.OrderButton} disabled={!this.state.formIsvalid}>SUBMIT</button>
                    </form>
                    if(!this.state.Isignup){
                        Form = <form onSubmit={this.OnSignHandler}>
                               {ExtractedForm.map(data =>{

                               if(data.id==='Email' || data.id==='password'){
                                   return  <Input 
                                   key = {data.id}
                                   EleConfig = {data.Elements.EleConfig}
                                   value = {data.Elements.value}
                                   label = {data.Elements.label}
                                   changed = {(event) => this.InputHandler(event,data.id)}
                                   invalid = {!data.Elements.valid}
                                   touched = {data.Elements.touched} />
                               } })}
                               <button className={classes.OrderButton}>SUBMIT</button>
                               </form>
                    }
                    let errorMessage = null;
                    if(this.props.error){
                       errorMessage = <h1 style = {{color: 'red'}}>{this.props.error.message}</h1>;
                    }
                    let Turn = <span>
                                  <h1 style={{
                    marginTop: '100px', 
                    color: 'green'}}>
                    {this.state.Isignup ? 'REGISTRATION FORM' : 'LOGIN'}
                   </h1>
                    <Aux>
                    {errorMessage}
                    {Form}
                    </Aux>
                     <p onClick={this.Toggle}>
                    {!this.state.Isignup ? 'REGISTER' : 'LOGIN'}
                     </p>
                             </span>;

                    if(this.props.ShowSpinner){
                        let position = [classes.Spin1];
                        if(this.state.Isignup){
                           position.push(classes.Spin2);
                        }
                        Turn= <span className={position.join(' ')}>
                              <Spinner />
                              <Backdrop show={true} />
                              </span>
                   }
        return(
            <div className={classes.Registration}>
                {Navigate}
               {Turn}
                </div>
        )
    }
}
const mapStateToProps = (state) =>{
  return{
    IsAuthenticated: state.TokenID !== null,
    status: state.status,
    Info: state.Info,
    ShowSpinner: state.ShowSpinner,
    error: state.error
  }
}
const mapDispatchToProps =(dispatch) =>{
    return{
       onSubmit: (email,password,Isignup,restdata) => dispatch(actions.reQuest(email,password,Isignup,restdata))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Register);