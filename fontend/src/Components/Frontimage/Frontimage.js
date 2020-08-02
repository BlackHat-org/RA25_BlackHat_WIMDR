import React from 'react';
import Img1 from '../../Assets/image/safe-banner.jpg';
import classes from './Frontimage.module.css';
import Logo from './../../Assets/image/Logo-AAS(1).png';
import { MDBCard, MDBCardBody,MDBContainer, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBIcon } from 'mdbreact';
const Frontimage = () =>{
    return(
    //   <div className={classes.Frontimage}>
    //       <img src={Img1} alt='AAs' />
    //       <p>AAS</p>
    //       <h1>Accident Alert System</h1>
    //   </div>
    //   <MDBRow>
    //   <MDBCol style={{ maxWidth: "100%" , margin:'2%'}}>
    //     <MDBCard reverse>
    //       <MDBCardImage cascade style={{ height: '20rem' , width:'100%' }} src={Img1} />
    //     </MDBCard>
    //   </MDBCol>
    // </MDBRow>
    // <MDBContainer className="mt-5" fluid>
    //     <MDBRow className="mt-4">
    //       <MDBCol md="12" style={{padding: '0px 0px' }}>
    //         <MDBView>
    //           <img
    //             src={Img1}
    //             style={{width: '100%    ' }}
    //             className="img-fluid"
    //             alt=""
    //           />
    //           <MDBMask className="flex-overlay" style={{background: '#0a202a91' }}>  
    //             <p className="text-overlay">super light overlay</p>
    //           </MDBMask>
    //         </MDBView>
    //       </MDBCol>
       
       
    //     </MDBRow>
    //   </MDBContainer>
    <MDBContainer className="mt-5" fluid>
      <MDBRow>
      <MDBCardImage cascade style={{ height: '20rem' , width:'100%' }} src={Img1} />
      </MDBRow>
      <MDBRow className={classes.card_text}>
      <MDBCardBody >
        <MDBRow>
          <MDBCol xs={3} md={3} lg={3}>
            <img src ={Logo} className={classes.logo} alt='Logo'/>
          </MDBCol>
          <MDBCol xs={9} md={9} lg={9}>
            <h3>What is AAS?</h3>
            <hr/>
            <p>
                Accident Alert System is a device which collect data from the incident
                via the help of sensors. The sensor analyze the impact and decides how much severe
                the incident is. If the outcome of the data declare the incident to be severe then the system initializes Alert
                and calling procedures.
              
            </p>
            </MDBCol>
            </MDBRow>
           
          </MDBCardBody>
      </MDBRow>

      </MDBContainer>
   
 

    )
}
export default Frontimage;