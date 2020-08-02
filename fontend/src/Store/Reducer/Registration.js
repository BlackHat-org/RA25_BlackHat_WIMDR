import * as actionTypes from '../Action/actionTypes';

const InitialState = {
    RegistrationForm: null,
    error: null,
    status: null,
    UserID: null,
    TokenID: null,
    Info: null,
    ShowSpinner: false
}
const addDetails = (state,action) =>{
    return{
        ...state,
        RegistrationForm: action.Details
    }
}
const errorHandle = (state,action) =>{
    return{
          ...state,
          error: action.error
    }
}
const checkStatus = (state,action) =>{
    return{
        ...state,
        status: 'Success'
    }
}
const userIdToken = (state,action) =>{
    return{
        ...state,
        UserID: action.UserId,
        TokenID: action.Token
    }
}
const loGout =(state,action) =>{
 return{
     ...state,
     UserID: null,
    TokenID: null,
    RegistrationForm: null,
    Info: null,
    status: null,
    error: null
 }
}
const infoSuccess = (state,action) =>{
    return{
        ...state,
          Info: 'Success'
    }
}
const showspinner = (state,action) =>{
    return {
        ...state,
        ShowSpinner: true
    }
}
const hidespinner = (state,action) =>{
        return{
            ...state,
          ShowSpinner: false
        }
    }

const reducer =(state = InitialState, action) =>{
    switch(action.type){
        case(actionTypes.ADDDETAILS): return addDetails(state,action);
        case(actionTypes.ERRORHANDLE): return errorHandle(state,action);
        case(actionTypes.SUCCESS): return checkStatus(state,action);
        case(actionTypes.PRIVATEINFO): return userIdToken(state,action);
        case(actionTypes.LOGOUT): return loGout(state,action);
        case(actionTypes.INFOSUCCESS): return infoSuccess(state,action);
        case(actionTypes.SHOWSPINNER): return showspinner(state,action);
        case(actionTypes.HIDESPINNER): return hidespinner(state,action);
        default: return state;
    }
}
export default reducer;