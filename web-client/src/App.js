//import './App.css';
import { useEffect } from 'react';
import NavBar from './navigationBar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/dashboard';
import UserProfile from './pages/UserProfile';
import { UserAuthContextProvider } from "./firebase/UserAuthContext";
import ProtectedRoute from "./firebase/protectedRoute";

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
        <Route path="/UserProfile" element = {<ProtectedRoute><UserProfile></UserProfile></ProtectedRoute>}/>
      </Routes>
      </UserAuthContextProvider>

  </div>

    </>  );};

export default App;
