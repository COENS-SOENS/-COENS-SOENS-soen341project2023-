import React, { Component } from 'react'
import { Link, useMatch, useResolvedPath } from "react-router-dom";

/*class navigationBar_welcome extends Component {

  render(){
    return(
      <nav className="NavbarItems">
        <h1> 
          EmployMe <i className='fab fa-react'></i>
        </h1>
        <ul>
          <li><a href='index.html'>
            <i className='fa-solid fa-house-user'></i> Home
          </a>

          </li>
        </ul>
      </nav>
    )
  }
}*/

function navigationBar_welcome() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        EmployMe <i className="fa-solid fa-briefcase"></i>
      </Link>
      <ul>
          <CustomLink to="/Home">
            Home <i className=' fa-solid fa-house-user'></i> 
          </CustomLink>
          <CustomLink to="/Services">
            Services <i className="fa-solid fa-bell-concierge"></i>
          </CustomLink>
          <CustomLink to="Got Questions ">
            Got Questions <i className="fa-duotone fa-question"></i>
          </CustomLink>
          <CustomLink to="/sign-in">
            Sign In <i className="fa-solid fa-right-to-bracket"></i>
          </CustomLink>

      </ul>
      </nav>
    )
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




/*
const navigationBar_welcome = () => {
  return (
    <div>navigationBar_welcome</div>
  )
}
*/
export default navigationBar_welcome;