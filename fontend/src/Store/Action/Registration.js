import * as actionTypes from './actionTypes';
import Axios from 'axios';

export const addDetail = (Data) =>{
    return{
        type: actionTypes.ADDDETAILS,
        Details: Data
    }
}
export const errorHandler =(error) =>{
    return {
        type: actionTypes.ERRORHANDLE,
        error: error
    }
}
export const transferSuccess =() =>{
    return{
        type: actionTypes.SUCCESS
    }
}
export const userIdandToken =(userId,token) =>{
 return{
    type: actionTypes.PRIVATEINFO,
    UserId: userId,
    Token: token
 }
}
export const logOut =() =>{
    localStorage.removeItem('token');
    return{
        type: actionTypes.LOGOUT
    }
}
export const daTa =(Data,userId) =>{
    let Datadded = {
        ...Data,
        userId: userId,
        RegistrationDate: new Date().toLocaleDateString(),
        latitude: '21.2121991',
        longitude: '81.6443402'
    }
   return dispatch =>{
    Axios.post('https://project-aas.firebaseio.com/UserDetails.json',Datadded)
    .then(res =>{
       dispatch(transferSuccess());
    })
    .catch(error =>{
        dispatch(errorHandler(error));
        dispatch(hideSpinner());
    });
   }
}
export const showSpinner = () =>{
    return{
        type: actionTypes.SHOWSPINNER
    }
}
export const hideSpinner = () =>{
    return{
        type: actionTypes.HIDESPINNER
    }
}
export const infoSuccess =() =>{
    return{
        type: actionTypes.INFOSUCCESS
    }
}
export const checkAuthTimeout =(expireTime) =>{
    return dispatch => {
    setTimeout(() =>{
    dispatch(logOut());
    },expireTime*1000)
    }
}
export const reQuest =(email,password,Isignup,restData) =>{
    return dispatch =>{
        dispatch(showSpinner());
        let SignUp = {
            email: email,
            password: password
        };
        
      let Url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAEe9J4ZWAZynk9_2QnlZBu3Y0JV4AQpG0'
         if(!Isignup){
             Url = 'https://cors-anywhere.herokuapp.com/https://backend-aas.herokuapp.com/api/rest-auth/login/'
         }
         Axios.post(Url,SignUp,)
               .then(res =>{
                 localStorage.setItem('token',res.data.key);
                if(Isignup){
                dispatch(daTa(restData,res.data.localId));
                dispatch(userIdandToken(res.data.localId,res.data.idToken));
                }
                else{
                   dispatch(userIdandToken(null,res.data.key));
                   dispatch(infoSuccess());
                   dispatch(fetchData(res.data.key))
                }
                // dispatch(checkAuthTimeout(res.data.expiresIn))
            })
               .catch(err =>{
                //    dispatch(errorHandler(err.response.data.error));
                //    dispatch(hideSpinner());
             console.log(err);    
               });
    }
}
export const fetchData = (token,userId) =>{
    return dispatch =>{
       // const queryParam = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        Axios.get('https://cors-anywhere.herokuapp.com/https://backend-aas.herokuapp.com/api/rest-auth/user',
                 {headers:{
                    Authorization: 'Token '+token
                 }
                })
              .then(res =>{
                  console.log(res);
                  dispatch(addDetail(res.data));
              })
              .catch(err =>{
                  dispatch(errorHandler(err));
                  dispatch(hideSpinner());
              });
    }
}

export const authCheckState = () =>{
    return dispatch =>{
       const token = localStorage.getItem('token');
       if(!token){
           dispatch(logOut());
       }
       else {
           const expiration = new Date(localStorage.getItem('expirationDate'));
           if(expiration > new Date()){
               const userId = localStorage.getItem('userId');
               dispatch(userIdandToken(userId,token));
               dispatch(infoSuccess());
               dispatch(checkAuthTimeout((expiration.getTime() - new Date().getTime())/1000));
           }
           else{
               dispatch(logOut());
           }
       }
    }
}