import React,{Component} from 'react';
import Frontimage from '../../Components/Frontimage/Frontimage';
import classes from './Home.module.css';
import whyAas from  '../../Assets/image/whyAas.png';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from 'mdbreact';


class Home extends Component {
    render(){
        return(
            <div >
                <MDBContainer fluid>
                    <MDBRow>
                        <MDBCol className="p-0">
                <Frontimage /> 
                </MDBCol>
                </MDBRow>
                </MDBContainer>
                <MDBContainer fluid  >
                  <MDBRow  className={classes.imp_AAS} >
                     <MDBCol sm={4}> <h3>Why AAS <br></br> is Important?</h3></MDBCol>
                     <MDBCol sm={8}>  <p>Major Death,in accidents, occur due to not getting instant Medical help.So Aas will provide the information
                         to the hospital and your family/friends ,if no one is their to help you after accident . 
                      </p></MDBCol>
                      <MDBRow>
                 <MDBCardImage className={classes.why_AAS} src={whyAas} />
                 </MDBRow>
                 </MDBRow>
              

                </MDBContainer>
                 
                      <MDBContainer fluid>
                      <h3>Features</h3>
                      
                 <MDBRow style={{ padding: "5%" }}>
                      <MDBCol xs={12} md={6} lg={3} style={{marginTop:'1%', marginBottom:'3%'}} >
                <MDBCard className={classes.MDBCards} style={{ height: "100%" }}>
                    <div className={classes.gradient}>
                     </div>
                <MDBRow className={classes.image_card} style={{ marginLeft: "26%" }}>
                    <MDBCardImage src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRnP2L3N71MYdjF4ch3vUMaHriOkZ-icFWojA&usqp=CAU' />
              </MDBRow>
      
             <MDBCardBody style={{ marginTop: "26%" }} >
        
          <MDBCardText> <p>This device will come in handy when a vehicle will get damaged by accident or any other phenomenon.</p></MDBCardText>
      
        </MDBCardBody>
      </MDBCard>
    </MDBCol>

    <MDBCol xs={12} md={6} lg={3} style={{marginTop:'1%', marginBottom:'3%'}}>
                <MDBCard className={classes.MDBCards} style={{ height: "100%" }}>
                    <div className={classes.gradient}>
                     </div>
                <MDBRow className={classes.image_card} style={{ marginLeft: "26%" }}>
                    <MDBCardImage src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSYC-_tdZ7VjYE9xG4dp6yZesZ0yBJzNYsw7A&usqp=CAU' />
              </MDBRow>
      
             <MDBCardBody style={{ marginTop: "26%" }} >
        
          <MDBCardText>  <p>The device will get activated immediately when it detects any major physical shock to body of vehicle and trigger an alarm.</p></MDBCardText>
      
        </MDBCardBody>
      </MDBCard>
    </MDBCol>

      <MDBCol xs={12} md={6} lg={3} style={{marginTop:'1%', marginBottom:'3%'}}>
                <MDBCard className={classes.MDBCards} style={{ height: "100%" }}>
                    <div className={classes.gradient}>
                     </div>
                <MDBRow className={classes.image_card} style={{ marginLeft: "26%" }}>
                    <MDBCardImage src='https://static.vecteezy.com/system/resources/previews/000/420/369/non_2x/vector-telephone-road-sign-icon.jpg' />
              </MDBRow>
             <MDBCardBody style={{ marginTop: "26%" }} >
          <MDBCardText> <p>If the alarm is not reset by the user then it will automatically dial a number which will be pre-saved by the user informing about the location of incident.</p></MDBCardText>
      
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
    <MDBCol xs={12} md={6} lg={3} style={{marginTop:'1%', marginBottom:'3%'}}>
                <MDBCard className={classes.MDBCards} style={{ height: "100%" }}>
                    <div className={classes.gradient}>
                     </div>
                <MDBRow className={classes.image_card} style={{ marginLeft: "26%" }}>
                    <MDBCardImage src='https://www.netclipart.com/pp/m/207-2071930_transparent-ambulance-icon-png-animated-ambulance.png' />
              </MDBRow>
      
             <MDBCardBody style={{ marginTop: "26%" }} >
        
          <MDBCardText><p>If the alarm is not reset by the user then it will automatically dial a number which will be pre-saved by the user informing about the location of incident.</p></MDBCardText>
      
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
    </MDBRow>           
         </MDBContainer><hr></hr>
                  </div>
           
        )
    }
}
export default Home;