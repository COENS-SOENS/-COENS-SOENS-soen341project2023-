import './App.css';
import { useEffect } from 'react';
import NavBar from './Componenets/navigationBar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';


//nst API_URL = '';//FireBase db api key goes here

const App = () => {
console.log(window.location)
  useEffect(() => {
//should learn this to retrieve data
  },[]);

  return (

    <>

  <div className="App">

    <NavBar/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-up" element={<SignUp/>} />

      </Routes>
  </div>

    </>  );};

export default App;
