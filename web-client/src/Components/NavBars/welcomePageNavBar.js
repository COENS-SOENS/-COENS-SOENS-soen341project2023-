import { Link, useMatch, useResolvedPath } from "react-router-dom";

function NavBar() {
  return (
  <nav className="nav">
    <Link to="/" className="site-title">
      EmployMe <i className="fa-solid fa-briefcase fa-1x" ></i>
    </Link>
    <ul>
        <CustomLink to="/Services">
            Services <i className="fa-solid fa-bell-concierge"></i></CustomLink>  
        <CustomLink to="/ContactUs">
            Contact Us <i className="fa-duotone fa-question"></i></CustomLink>
        <CustomLink to="/role-selection"> Sign Up</CustomLink>
        <CustomLink to="/sign-in"> Sign In <i className="fa-solid fa-right-to-bracket"></i> </CustomLink>
        
    </ul>
    </nav>
  )
}

function CustomLink({to, iconStyle, children, ...props }) {
  
  const isActive = useMatch({ path: useResolvedPath(to).pathname,end: true});

  return (
    <li className={isActive ? "active" : ""}>
    <Link to={to} {...props}>
      <span style={iconStyle}>
        {children}
      </span>  
    </Link>
    </li>
  )
}

export default NavBar;