import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { firestore } from '../../firebase/firebase';
import { useUserAuth } from "../../firebase/UserAuthContext";
import { useNavigate } from "react-router-dom";


 export default function ListAllJobs(){
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();
    //const Navigation = useNavigation();
    useEffect(()=>{
        FetchPost();
    }, [])
    useEffect(() => {
        console.log("JOBS:",jobs)

    },[jobs])
    const FetchPost = async () => {

    await getDocs(collection(firestore, "Postings"))
        .then(querySnapshot=>{               
            const newData = querySnapshot.docs.map(doc => ({data:doc.data(),
            id:doc.id }));
            setJobs(newData);                
            console.log(jobs, newData);
        })
        .catch(error => console.log(error.essage))
   

    }
    const toJobPost=(jobData)=>{
        navigate('/job-post',{state:{data: jobData}});
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

    useEffect(()=>{
        FetchPost();
    }, [])
    useEffect(() => {
        console.log("JOBS:",jobs)

    },[jobs])
    const FetchPost = async () => {
    const q = query(collection(firestore, "Postings"), where("EmployerUID", "==", user.uid));
    await getDocs(q)
        .then(querySnapshot=>{               
            const newData = querySnapshot.docs.map(doc => ({data:doc.data(),
            id:doc.id }));
            setJobs(newData);                
            console.log(jobs, newData);
        })
        .catch(error => console.log(error.essage))
   

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
                </tr>
                </thead>
                <tbody>
            {jobs.map(job => <tr key={job.id}><td>{job.data.Job}</td><td>{job.data.Company}</td><td>${job.data.Salary}</td></tr>)}
            </tbody>
            </table>
        </ul>
        </>
    )
 }