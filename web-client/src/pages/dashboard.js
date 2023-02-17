import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import NavBar from '../navigationBar';
import { Button } from 'react-bootstrap';
import { useUserAuth } from '../firebase/UserAuthContext';

export default function Dashboardashboard() {
  const [error, setError] = useState("");
  const { logOut } = useUserAuth();
  const navigate = useNavigate();

  const handleLogOut = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  function MyUserProfileButton()
  {
    function handleProfilePage() {
      navigate.push('/UserProfile');

  }

  return (
    <>
      <NavBar />
      <div>Dashboard</div>
      <Button variant="primary" onClick={handleLogOut}>
        Log Out
      </Button>
      <Button variant="primary" onClick={handleProfilePage}></Button>
      Profile Page
    </>
  )
}
};
