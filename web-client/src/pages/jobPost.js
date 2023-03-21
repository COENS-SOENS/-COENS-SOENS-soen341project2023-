import React, {useContext} from 'react'
import { Button, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import NavBar from '../Components/NavBars/authorizedNavBar';
import { useUserAuth } from '../firebase/UserAuthContext';
import { deleteDoc, collection, doc, FieldValue, arrayUnion, updateDoc } from "@firebase/firestore";
import { firestore } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import NavBarProfilePage from '../Components/NavBars/NavBarProfilePage';
import { DataContext } from '../Components/jobPostContext';
import ApplicantQuery from '../Components/applicantQuery';

export const JobPost = () => {
  const navigate = useNavigate();
  const {userRole, user} = useUserAuth();
 
  const { data } = useContext(DataContext);
console.log("DATA CONTEXT: ", data);
const id = data.jobby.id;//document name to identify the document that needs to be edited/deleted
console.log("data ID", id)
  const handleDelete =async () =>{
    await deleteDoc(doc(firestore, "Postings", id));
    navigate("/home");
  }
  console.log("UID: ", user.uid);
  const handleApply =async () =>{
    const Ref = doc(firestore, "Postings", id);
    await updateDoc(Ref, {
      applicants: arrayUnion(user.uid)
    })
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
    <div>
      <ApplicantQuery data={data.jobby.data.applicants}/>
    </div>
        </>
    )
  }
  else{
  return (
    <>
    <NavBarProfilePage/>
    <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px', lineHeight: '1.5', color: '#333333', padding: '20px' }}>Job Post</div>
    <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 10px 0' }}>
        {data.jobby.data.Job}
        </h1>
        <h2 style={{ fontSize: '20px', fontWeight: 'normal', margin: '0 0 10px 0' }}>
        {data.jobby.data.Company}
        </h2>
        <h3 style={{ fontSize: '18px', fontWeight: 'normal', margin: '0 0 10px 0' }}>
        ${data.jobby.data.Salary}
        </h3>
        <p style={{ fontSize: '16px', fontWeight: 'normal', marginBottom: '20px' }}>
        {data.jobby.data.Description}
        </p>

<Button onClick={handleApply}>Apply</Button>
    </>
  )
  }
}