import React from 'react'
import { Button } from 'react-bootstrap'
import NavBar from '../Components/NavBars/welcomePageNavBar'
import { useNavigate} from 'react-router-dom';
import Background from '../assets/office_char.jpg';

export const RoleSelection = () => {
    const navigate = useNavigate();

    const navigateToUserSignUp = () => {
        navigate('/sign-up');
      };
    
      const navigateEmployerSignUp = () => {
        navigate('/employer-sign-up');
      };

      const navigateToAdminSignUp = () => {
        navigate('/admin-sign-up');
      };

      const backgroundStyle = {
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundColor: 'blue',
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '93.4vh',
      };

      const textDivStyle = {
        backgroundColor: 'transparent',
        color: 'black',
        textAlign: 'center',
        fontSize: '2.5rem',
        padding: '1rem',
        border: 'none'
      };

      const buttonStyle = {
        backgroundColor: '#C8D675',
        color: 'white',
        fontSize: '1rem',
        padding: '1rem 3rem',
        margin: '0.5rem',
        borderRadius: '30px',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '2px 2px 2px grey'
      };

  return (
    <>
     <NavBar/>
     
     <div style={backgroundStyle}>

     <div style={textDivStyle}>
        Please select what describes you the best
      </div>
      
     <div className='role-select'>
        <Button style={buttonStyle} onClick={navigateToUserSignUp}>Job Seeker</Button>
        <Button style={buttonStyle} onClick={navigateEmployerSignUp}>Employer</Button>
        
    </div>
        <Button style={buttonStyle} onClick={navigateToAdminSignUp}>administration</Button>
   
    </div>
    </>
    
  )
}
