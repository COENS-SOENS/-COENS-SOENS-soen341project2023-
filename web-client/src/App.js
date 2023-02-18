//import './App.css';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/dashboard';
import WelcomePage from './pages/WelcomePage';
import { UserAuthContextProvider } from "./firebase/UserAuthContext";
import ProtectedRoute from "./firebase/protectedRoute";
import NavBars from './Componenets/NavBars/navigationBar_welcome';


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
        <Route path="Welcome-page" element={<WelcomePage/>} />
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-up" element={<SignUp/>} />
       
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      </Routes>
      </UserAuthContextProvider>
    <NavBars/>


  </div>

    </>  );};

export default App;
