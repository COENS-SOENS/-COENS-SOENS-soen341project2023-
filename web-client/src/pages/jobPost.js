import React from 'react'
import { Button, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import NavBar from '../Components/NavBars/authorizedNavBar';
import { useUserAuth } from '../firebase/UserAuthContext';
import { deleteDoc, collection, doc } from "@firebase/firestore";
import { firestore } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';

export const JobPost = (props) => {
  const navigate = useNavigate();
  const {userRole} = useUserAuth();
  const location = useLocation();
  const data = location.state.data;
  const id = data.id;//document name to identify the document that needs to be edited/deleted
  console.log("data ID", id)
  const {navigation} = props;

  const handleDelete =async () =>{
    await deleteDoc(doc(firestore, "Postings", id));
    navigate("/home");
  }


  
  if(userRole === "Employer" || userRole === "admin")
  {
    return(
      <>
      <NavBar/>
        <div>Job Post</div>
        <h1>
        {data.data.Job}
        </h1>
        <h2>
        {data.data.Company}
        </h2>
        <h3>
        ${data.data.Salary}
        </h3>
        <h4>
        {data.data.Description}
        </h4>
    
    <Button>Edit</Button>
    <Button onClick={handleDelete}>Delete</Button>
        </>
    )
  }
  else{
  return (
    <>
  <NavBar/>
    <div>Job Post</div>
    <h1>
    {data.data.Job}
    </h1>
    <h2>
    {data.data.Company}
    </h2>
    <h3>
    ${data.data.Salary}
    </h3>
    <h4>
    {data.data.Description}
    </h4>

<Button>Apply</Button>
    </>
  )
  }
}
