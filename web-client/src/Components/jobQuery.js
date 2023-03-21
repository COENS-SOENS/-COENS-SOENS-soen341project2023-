import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { useUserAuth } from "../firebase/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { JobPost } from "../pages/jobPost";
import { DataContext } from "./jobPostContext";
import { CandidateContext } from '../Components/CandidateContext';
import { Button } from 'react-bootstrap';


 export default function ListAllJobs(){
    const [jobSelected, setJobSelected] = useState(false);
    const [jobs, setJobs] = useState([]);
    const {data, setData} = useContext(DataContext);
    const navigate = useNavigate();
    const { selectedCandidate = () => {} } = useContext(CandidateContext) || {};

    //const Navigation = useNavigation();
    useEffect(()=>{
        FetchPost();
    }, [])
    useEffect(() => {
        //console.log("JOBS:",jobs)

    },[jobs])
    const FetchPost = async () => {

    await getDocs(collection(firestore, "Postings"))
        .then(querySnapshot=>{               
            const newData = querySnapshot.docs.map(doc => ({data:doc.data(),
            id:doc.id }));
            setJobs(newData);                
            //console.log(jobs, newData);
        })
        .catch(error => console.log(error.essage))


    }
    
    const toJobPost=(jobData)=>{
        setData({jobby:jobData});
        setJobSelected(true);
        navigate('/job-post');
          }
              return (
        <>
        <h1>List of job postings</h1>
        <ul>
            <table class="styled-table">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Company</th>
                    <th>Salary</th>
                    {selectedCandidate? (
                        <Button> Selected</Button>
                    ) :(
                        <Button> Not Selected</Button>
                    )}
                </tr>
                </thead>
                <tbody>
            {jobs.map(job => <tr onClick={() => {toJobPost(job)}}
                 key={job.id}><td>{job.data.Job}</td><td>{job.data.Company}</td><td>${job.data.Salary}</td></tr>)}
            </tbody>
            </table>
        </ul>
        </>
    )
 }

 //------------------------------------------------------------------------------------------------------------------------

 export function ListJobsFromUID(){
    const [jobs, setJobs] = useState([]);
    const { user, userRole } = useUserAuth();
    const [jobSelected, setJobSelected] = useState(false);
    const {data, setData} = useContext(DataContext);
    const navigate = useNavigate();

    useEffect(()=>{
        FetchPost();
    }, [])
    useEffect(() => {
        //console.log("JOBS:",jobs)

    },[jobs])
    const FetchPost = async () => {
    const q = query(collection(firestore, "Postings"), where("EmployerUID", "==", user.uid));
    await getDocs(q)
        .then(querySnapshot=>{               
            const newData = querySnapshot.docs.map(doc => ({data:doc.data(),
            id:doc.id }));
            setJobs(newData);                
            //console.log(jobs, newData);
        })
        .catch(error => console.log(error.essage))


    }
    const toJobPost=(jobData)=>{
        setData({jobby:jobData});
        setJobSelected(true);
        navigate('/job-post');
          }
          function getArraySize(arr){
            if(arr === null || arr === undefined)
            {
                return "";
            }
            else{
                return Object.keys(arr).length;
            }
          }
    return (
        <>
        <h1>Your Job Postings</h1>
        <ul>
            <table class="styled-table">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Company</th>
                    <th>Salary</th>
                    <th>Applicants</th>
                </tr>
                </thead>
                <tbody>
            {jobs.map(job => <tr onClick={() => {toJobPost(job)}}
            key={job.id}><td>{job.data.Job}</td><td>{job.data.Company}</td><td>{job.data.Salary}</td><td>{getArraySize(job.data.applicants)}</td></tr>)}
            </tbody>
            </table>
        </ul>
        </>
    )
 }