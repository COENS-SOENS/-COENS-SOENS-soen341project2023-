import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import { useUserAuth } from '../../firebase/UserAuthContext';
import React, { useState } from "react";

function NavBar() {
  const [error, setError] = useState("");
  const { logOut, userRole } = useUserAuth();
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
  if(userRole === "Employer"){
    return (
      <nav className="nav">
        <Link to="/home" className="site-title">
          EmployMe
        </Link>
        <ul>
        <CustomLink to="/create-job-posting"> Create Post</CustomLink>
        <Link to="/" onClick={handleLogOut}> Log Out</Link>
        </ul>
        </nav>
      )
  }
  else{
  return (
  <nav className="nav">
    <Link to="/home" className="site-title">
      EmployMe  <i className="fa-solid fa-briefcase" > style={{fontSize:"2em"}}</i>
    </Link>
    <ul>
    <Link to="/" onClick={handleLogOut}> Log Out</Link>
    </ul>
    </nav>
  )
}
}

function CustomLink({to, children, ...props }) {
  
  const isActive = useMatch({ path: useResolvedPath(to).pathname,end: true});

  return (
    <li className={isActive ? "active" : ""}>
    <Link to={to} {...props}>
      {children}
    </Link>
    </li>
  )
}

export default NavBar;