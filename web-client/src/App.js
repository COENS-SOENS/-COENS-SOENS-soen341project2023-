import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Welcome from './pages/Welcome';

import Services from './pages/Services';

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
import MySavedJobs from './pages/MySavedJobs';
import ContactUs from './pages/contactUs';
import { JobPost } from './pages/jobPost';
import EmployerProfilePage from './pages/EmployerProfilePage'
import { DataProvider } from './Components/Contexts/jobPostContext';
import { ListAllUsers } from './pages/ListAllUsers';
import { UserDataProvider } from './Components/Contexts/userListContext';
import { AdminUserView } from './pages/AdminUserView';
import { AdminJobView } from './pages/AdminJobView';

const App = () => {

  useEffect(() => {
    //should learn this to retrieve data
  }, []);


  return (

    <>
      <div className="App">

        <UserAuthContextProvider>
          <UserDataProvider>
          <DataProvider>
          <Routes>
            <Route path="/" element={<Welcome />} />

            <Route path="/Services" element={<Services />} />

            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/create-job-posting" element={<ProtectedRoute><CreateJobListing /></ProtectedRoute>} />
            <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/role-selection" element={<RoleSelection />} />
            <Route path="/employer-sign-up" element={<EmployerSignUp />} />
            <Route path="/admin-sign-up" element={<AdminSignUp/>} />
            <Route path="/MyProfile" element={<ProtectedRoute><MyProfile></MyProfile></ProtectedRoute>} />
            <Route path="/list-users" element={<ProtectedRoute><ListAllUsers></ListAllUsers></ProtectedRoute>} />
            <Route path="/admin-user-view" element={<ProtectedRoute><AdminUserView></AdminUserView></ProtectedRoute>} />
            <Route path="/AdminProfile" element={<AdminProfile />} />   
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/job-post" element={<ProtectedRoute><JobPost /></ProtectedRoute>} />
            <Route path="/employers-profile-page" element={<ProtectedRoute><EmployerProfilePage /></ProtectedRoute>} />
            <Route path="/my-saved-jobs-page" element={<ProtectedRoute><MySavedJobs /></ProtectedRoute>} />
            <Route path="/admin-job-view" element={<ProtectedRoute>< AdminJobView/></ProtectedRoute>} />
          </Routes>
          </DataProvider>
          </UserDataProvider>
        </UserAuthContextProvider>



      </div>

    </>);
};

export default App;