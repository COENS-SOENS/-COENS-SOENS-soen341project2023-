//import './App.css';
import React, { useEffect, useContext, useState } from 'react';
import NavBar from './Components/NavBars/welcomePageNavBar';
import { Route, Routes } from 'react-router-dom';
import Welcome from './pages/Welcome'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import { UserAuthContextProvider, useUserAuth } from "./firebase/UserAuthContext";
import ProtectedRoute from "./firebase/protectedRoute";
import { RoleSelection } from './pages/roleSelection';
import EmployerSignUp from './pages/employerSignUp';
import { CreateJobListing } from './pages/CreateJobListing';
import { doc, getDoc } from "firebase/firestore";
import { firestore } from './firebase/firebase';


import { JobPost } from './pages/jobPost';

const App = () => {
  const { user } = useUserAuth();
  const [error, setError] = useState("");
  const { userRole } = useUserAuth();//not rlly necessary

  useEffect(() => {
//should learn this to retrieve data
  },[]);


  return (

    <>
  <div className="App">

    <UserAuthContextProvider>
      <Routes>
        <Route path="/" element={<Welcome/>} />
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="/create-job-posting" element={<ProtectedRoute><CreateJobListing/></ProtectedRoute>}/>
        <Route path="/role-selection" element={<RoleSelection/>} />
        <Route path="/employer-sign-up" element={<EmployerSignUp/>} />
      </Routes>
      </UserAuthContextProvider>

  </div>

    </>  );};

export default App;

