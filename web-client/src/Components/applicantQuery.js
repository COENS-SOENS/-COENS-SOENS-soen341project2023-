import { createContext, useContext, useEffect, useState } from "react";
import { useUserAuth } from "../firebase/UserAuthContext";
import { useNavigate, Link } from "react-router-dom";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { Button } from "react-bootstrap";
//import {CV_query} from './CV_query';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import OneSignal from 'react-onesignal';


// initialize OneSignal. 
OneSignal.init({ appId: '2d4c4844-3183-4b4a-b022-12ec6e15d8ed'});
export default function ApplicantQuery(props) {
    const [applicants, setApplicants] = useState([]);
    const { user, userRole } = useUserAuth();
    const [jobSelected, setJobSelected] = useState(false);
    const navigate = useNavigate();
    console.log("applicant props",props);
    useEffect(()=>{
        FetchPost();
        fetchApplicants();
    }, [])
    useEffect(() => {
        console.log("JOBS:",applicants)

    },[applicants])
    const FetchPost = async () => {
    const q = query(collection(firestore, "Users"), where('uid', 'in', props.data));
    await getDocs(q)
        .then(querySnapshot=>{               
            const newData = querySnapshot.docs.map(doc => ({data:doc.data(),
            id:doc.id, playerId: doc.data() }));
            setApplicants(newData);                
            console.log("applicants",applicants);
        })
        .catch(error => console.log(error.essage))


    }
    async function handleCVDownload(uid) {
        console.log("DOWNLOAD_UID", uid);
        const storage = getStorage();    
    const Ref = ref(storage, 'resumes/'+ uid + '.pdf');
    
    // Get the download URL
    getDownloadURL(Ref)
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
        console.log("URL", url);
        window.open(url);
        return url;
      })
      .catch((error) => {
        alert("User has not uploaded a Resume/CV!")
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            break;
          case 'storage/unauthorized':
            // User doesn't have permission
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
    
    
          case 'storage/unknown':
            // Unknown error occurred
            break;
        }
      });
        //CV_query(uid);
    }

    const fetchApplicants = async () => {
      const q = query(collection(firestore, "Users"), where('uid','in',props.data));
      const querySnapshot = await getDocs(q);
      const newData = querySnapshot.docs.map(doc => ({
        data: doc.data(),
        id: doc.id
      }));
      setApplicants(newData);
    }

    async function handleCandidateSelected(uid) {
      const playerDoc = await getDoc(doc(firestore, "Users", uid));
      const playerId = playerDoc.data().playerId;
    
      // Get the OneSignal player ID for the current user
      OneSignal.getUserId().then(async function(playerId) {
        console.log("OneSignal Player ID:", playerId);
    
        // Create a new notification object for the selected candidate
        const candidateNotification = {
          contents: {
            en: 'Congratulations! You have been selected as a candidate.'
          }, 
          include_player_ids: [playerId]
        };
    
        // Send the notification to the selected candidate
        try {
          await fetch('https://onesignal.com/api/v1/notifications', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Basic MjY5MDgxMzUtMDRiMC00ZTVmLWJiOWUtYmQ5NzFjMjA5MmYw'
            },
            body: JSON.stringify(candidateNotification)
          });
          console.log('Notification sent to candidate.');
        } catch(error) {
          console.log('Error sending notification to candidate:', error);
        }
    
        // Create a new notification object for the employer
        const employerNotification = {
          contents: {
            en: 'A candidate has been selected for the job.'
          }, 
          include_player_ids: [playerDoc.data().employerId]
        };
    
        // Send the notification to the employer
        try {
          await fetch('https://onesignal.com/api/v1/notifications', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Basic MjY5MDgxMzUtMDRiMC00ZTVmLWJiOWUtYmQ5NzFjMjA5MmYw'

            },
            body: JSON.stringify(employerNotification)
          });
          console.log('Notification sent to employer.');
        } catch(error) {
          console.log('Error sending notification to employer:', error);
        }
      }).catch(function(error) {
        console.log('Error getting OneSignal player ID:', error);
      });
    }
  return (
    <>
    <div>applicantQuery</div>
    <>
        <h1>Applicants</h1>
        <ul>
            <table class="styled-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>CV</th>
                    <th>Candidate Selection </th>
                </tr>
                </thead>
                <tbody>
            {applicants.map(app => <tr onClick={() => {}}//TBD whether it redirects to a new page
            key={app.id}><td>{app.data.firstName} {app.data.lastName}</td><td>{app.data.email}</td><td><Button onClick={() => handleCVDownload(app.data.uid)}>view/download CV</Button>
            </td>

            <td> <Button onClick={() => handleCandidateSelected(app.data.uid)}>Select Candidate</Button>

            </td>

            </tr>)}
            </tbody>
            </table>
        </ul>
        </>
    </>
  )
}
