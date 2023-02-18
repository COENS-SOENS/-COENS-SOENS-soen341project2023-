import { Link, useMatch, useResolvedPath } from "react-router-dom";

function NavBar() {
  return (
  <nav className="nav">
    <Link to="/" className="site-title">
      EmployMe
    </Link>
    <ul>
    <CustomLink to="/Home">
            Home <i className=' fa-solid fa-house-user'></i> 
          </CustomLink>
          <CustomLink to="/Services">
            Services <i className="fa-solid fa-bell-concierge"></i>
          </CustomLink>
          <CustomLink to="/sign-up">
            Sign Up <i className="fa-solid fa-address-card"></i>
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

export default NavBar;