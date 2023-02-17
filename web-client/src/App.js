//import './App.css';
import { useEffect } from 'react';
import NavBar from './Components/NavBars/welcomePageNavBar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/dashboard';
import { UserAuthContextProvider } from "./firebase/UserAuthContext";
import ProtectedRoute from "./firebase/protectedRoute";
import { RoleSelection } from './pages/roleSelection';
import EmployerSignUp from './pages/employerSignUp'

//import api_key from './secrets'

//nst API_URL = '';//FireBase db api key goes here

const App = () => {
//console.log(api_key);
//console.log(window.location)
  useEffect(() => {
//should learn this to retrieve data
  },[]);

  return (

    <>

  <div className="App">

    <UserAuthContextProvider>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        <Route path="/role-selection" element={<RoleSelection/>} />
        <Route path="/employer-sign-up" element={<EmployerSignUp/>} />
      </Routes>
      </UserAuthContextProvider>

  </div>

    </>  );};

export default App;
