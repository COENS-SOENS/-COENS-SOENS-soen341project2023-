import React, {useState, useRef} from "react";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import {firestore} from "../firebase/firebase";
import { useUserAuth } from "../firebase/UserAuthContext";
import { addDoc, collection, doc, updateDoc } from "@firebase/firestore";
import NavBar from '../Components/NavBars/authorizedNavBar'
import { useNavigate} from 'react-router-dom';

export const CreateJobListing = () => {
    const ref = collection(firestore,"Postings");
    const [jobTitle, setJobTitle] = useState("");
    const [error, setError] = useState("");
    const [salary, setSalary] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const {companyName, user} = useUserAuth();
    
   
    const navigateHome = () => {
      navigate('/home');
    };
    const handleSubmit = async (e) => { //handles firebaseUI authentication
      e.preventDefault();
      setError("");
      try {
        handleSave();
        navigate("/home");
      } catch (err) {
        setError(err.message);
      }
    }
    const handleSave = async(e) => {
      //e.preventDefault();//so page doesn;t refresh when save button is clicked
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

      let data = {
          Company: companyName,
          Salary: formatter.format(parseFloat(salary.replace(/\D/g,''))),
          Job: jobTitle,
          Description: description,
          EmployerUID: user.uid,//used to only display postings from active employer
          jobID: ref.id
        };
console.log("data", companyName);
      try {
          const new_doc = addDoc(ref, data);
          const userRef = doc(firestore, "Postings", (await new_doc).id)
          let data2 = {
            Company: companyName,
            Salary: formatter.format(parseFloat(salary.replace(/\D/g,''))),
            Job: jobTitle,
            Description: description,
            EmployerUID: user.uid,//used to only display postings from active employer
            jobID: userRef.id
          };
          await updateDoc(userRef, data2);
          //const res = await new_doc.update({jobID: (await new_doc).id});
          
      }catch (e) {
          console.log(e);
      }
  }

  return (
    <>
    <NavBar/>
<h2 className="mb-3" >Create Job Posting</h2>

{error && <Alert variant="danger">{error}</Alert>}
  <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="formBasicText">
      <Form.Control
        type="jobTitle"
        placeholder="Job Title"
        onChange={(e) => setJobTitle(e.target.value)}
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicText">
      <Form.Control
        type="salary"
        placeholder="Salary"
        onChange={(e) => setSalary(e.target.value)}
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicText">
      <Form.Control as ="textarea" rows="5"
        type="description"
        placeholder="Job Description"
        onChange={(e) => setDescription(e.target.value)}
      />
    </Form.Group>

    <Button type="Submit">Create</Button>
  </Form>
 

</>
  
  );
  
};

  export default CreateJobListing;