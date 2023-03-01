
import NavBar from '../Components/NavBars/authorizedNavBar';
import {Button} from 'react-bootstrap';
import ListAllJobs, { ListJobsFromUID } from '../Components/Queries/jobQuery';
import { useUserAuth } from '../firebase/UserAuthContext';
export default function Home() {
  const { user, userRole } = useUserAuth();

  if(userRole === "User")
  {
  return (
    <>
    <NavBar/>
    <div>Home</div>
    <ListAllJobs />
    </>
  )
  }
  else if(userRole === "Employer")
  {
    return (
      <>
      <NavBar/>
      <div>Your job postings</div>
      <ListJobsFromUID />
      </>
    )
  }
}

