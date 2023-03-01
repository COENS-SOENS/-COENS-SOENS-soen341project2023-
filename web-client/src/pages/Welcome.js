import { Link } from "react-router-dom";
import { Form, Alert, Carousel } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Background from '../assets/office_char.jpg';
import NavBar from "../Components/NavBars/welcomePageNavBar";
import Wrapper from "../assets/Wrappers/welcomeWrapper";
import Testimonial from "../Components/Testimonial";

const Welcome = () => {
  return (
    <>
      <NavBar />
      <div 
        style={{  
          backgroundImage: `url(${Background})`,
          backgroundSize: 'cover' ,
          backgroundColor: 'blue', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100vh',
          width: '100vw' 
        }}
      >
        <div className="p-4 box" style={{ padding: '30px' }}>
          <div className="Welcome test section"></div>    
          <div className="Home-text-section">
            <h1 className="primary-heading">
              Your journey starts here...
            </h1> 
            <p className='primary intro text'>
              Are you a student looking for your dream job? 
              A recruiter looking for hidden talents?
              ...Sign up now!!...Hurry! 
            </p>
            <Link to ="/role-selection">
              <Button variant="primary">Sign up now</Button>
            </Link>
          </div>
        </div>
      </div>
      <Testimonial />
    </>
  );
};

export default Welcome;

