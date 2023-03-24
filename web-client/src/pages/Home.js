import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { useUserAuth } from '../firebase/UserAuthContext';
import NavBarProfilePage from '../Components/NavBars/NavBarProfilePage';
import '../Components/NavBars/NavBarProfilePage.css'
import ListAllJobs, { ListJobsFromUID } from '../Components/jobQuery';
import AdminDashboard from "../Components/adminDashboard";
import AdminProfile from "./AdminProfile";

export default function Home() {
  const [error, setError] = useState("");
  const { userRole } = useUserAuth();

    switch(userRole){
      case "User":
        return (
          <>
            <NavBarProfilePage/>
            <div>Home</div>
            <ListAllJobs />
          </>
        );
        break;
      case "Employer":
        return (
          <>
            <NavBarProfilePage/>
            <div>Your job postings</div>
            <ListJobsFromUID />
          </>
        );
        break;
      case "Admin":
        return (
          <>
          <NavBarProfilePage/>
          <AdminDashboard/>
        
          </>
        );
        break;
      default:
        
    }
  }

