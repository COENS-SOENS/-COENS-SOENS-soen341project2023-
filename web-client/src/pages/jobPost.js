import React, {useContext} from 'react'
import { Button, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import NavBar from '../Components/NavBars/authorizedNavBar';
import { useUserAuth } from '../firebase/UserAuthContext';
import { deleteDoc, collection, doc } from "@firebase/firestore";
import { firestore } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import NavBarProfilePage from '../Components/NavBars/NavBarProfilePage';
import { DataContext } from '../Components/storeContext';

export const JobPost = () => {
  const navigate = useNavigate();
  const {userRole} = useUserAuth();
 
  const { data } = useContext(DataContext);
console.log("DATA CONTEXT: ", data);
const id = data.jobby.id;//document name to identify the document that needs to be edited/deleted
console.log("data ID", id)
  const handleDelete =async () =>{
    await deleteDoc(doc(firestore, "Postings", id));
    navigate("/home");
  }



  if(userRole === "Employer" || userRole === "admin")
  {
    return(
      <>
      <NavBarProfilePage/>
        <div>Job Post</div>
        <h1>
        {data.jobby.data.Job}
        </h1>
        <h2>
        {data.jobby.data.Company}
        </h2>
        <h3>
        ${data.jobby.data.Salary}
        </h3>
        <h4>
        {data.jobby.data.Description}
        </h4>

    <Button>Edit</Button>
    <Button onClick={handleDelete}>Delete</Button>
        </>
    )
  }
  else{
  return (
    <>
    <NavBarProfilePage/>
    <div>Job Post</div>
    <h1>
        {data.jobby.data.Job}
        </h1>
        <h2>
        {data.jobby.data.Company}
        </h2>
        <h3>
        ${data.jobby.data.Salary}
        </h3>
        <h4>
        {data.jobby.data.Description}
        </h4>

<Button>Apply</Button>
    </>
  )
  }
}