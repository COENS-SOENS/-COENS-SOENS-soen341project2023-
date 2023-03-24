
//import './App.css';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Welcome from './pages/Welcome'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import MyProfile from './pages/MyProfile'
import AdminSignUp from './pages/adminSignUp';
import AdminProfile from './pages/AdminProfile';
import AdminDashboard from './Components/adminDashboard';
import { UserAuthContextProvider } from "./firebase/UserAuthContext";
import ProtectedRoute from "./firebase/protectedRoute";
import { RoleSelection } from './pages/roleSelection';
import EmployerSignUp from './pages/employerSignUp';
import { CreateJobListing } from './pages/CreateJobListing';
import { doc, getDoc } from "firebase/firestore";
import { firestore } from './firebase/firebase';
import ContactUs from './pages/contactUs';
import Testimonial from './Components/Testimonial';
import { JobPost } from './pages/jobPost';
import EmployerProfilePage from './pages/EmployerProfilePage'
import { DataProvider } from './Components/jobPostContext';


const App = () => {


  useEffect(() => {
    //should learn this to retrieve data
  }, []);


  return (

    <>
      <div className="App">

        <UserAuthContextProvider>
          <DataProvider>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/create-job-posting" element={<ProtectedRoute><CreateJobListing /></ProtectedRoute>} />
            <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/role-selection" element={<RoleSelection />} />
            <Route path="/employer-sign-up" element={<EmployerSignUp />} />
            <Route path="/admin-sign-up" element={<AdminSignUp/>} />
            <Route path="/MyProfile" element={<ProtectedRoute><MyProfile></MyProfile></ProtectedRoute>} />
            <Route path="/AdminProfile" element={<AdminProfile />} />   
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/job-post" element={<ProtectedRoute><JobPost /></ProtectedRoute>} />
            <Route path="/employers-profile-page" element={<ProtectedRoute><EmployerProfilePage /></ProtectedRoute>} />
          </Routes>
          </DataProvider>
        </UserAuthContextProvider>



      </div>

    </>);
};

export default App;