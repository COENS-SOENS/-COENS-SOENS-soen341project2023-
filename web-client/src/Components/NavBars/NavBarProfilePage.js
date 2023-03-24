import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { SideBar } from './SideBar';
import { AdminSideBar } from './AdminSideBar';
import './NavBarProfilePage.css';
import { IconContext } from 'react-icons';
import { useUserAuth } from '../../firebase/UserAuthContext';

export default function NavBarProfilePage({ onSidebarClick }) {
    const [sidebar, setSidebar] = useState(false);
    const {userRole, logOut} = useUserAuth();
    const showSidebar = (e) => {
        e.preventDefault();//prevents re-rendering
        setSidebar(!sidebar)};
    const navigate = useNavigate();;
    const [error, setError] = useState("");

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

    if (userRole === "Employer") {
        return (
            <>
                <IconContext.Provider value={{ color: 'white' }}>
                    <div className='nav'>
                        <div className='navBarProfilePage'>
                            <Link to='#' className='menu-bars'>
                                <FaIcons.FaBars onClick={showSidebar} />
                            </Link>
                        </div>
                        <div className='nav'>
                            <ul>
                                <Link to='/create-job-posting'>
                                    Create Post
                                </Link>
                            </ul>
                        </div>
                        <div className='nav'>
                            <ul>
                                <Link to='/' onClick={handleLogOut}>
                                    Log Out
                                </Link>
                            </ul>
                        </div>
                    </div>
                    <nav className={sidebar ? 'nav-menu-sidebar active' : 'nav-menu-sidebar'}>
                        <ul className='nav-menu-sidebar-items' onClick={showSidebar}>
                            <li className='navbar-toggle'>
                                <Link to='#' className='menu-bars'>
                                    <AiIcons.AiOutlineClose />
                                </Link>
                            </li>
                            <SideBar userRole={userRole}/>
                        </ul>
                    </nav>
                </IconContext.Provider>
            </>
        );
    }
    else if (userRole === "User") {
        return (
            <>
                <IconContext.Provider value={{ color: 'white' }}>
                    <div className='nav'>
                        <div className='navBarProfilePage'>
                            <Link to='#' className='menu-bars'>
                                <FaIcons.FaBars onClick={showSidebar} />
                            </Link>
                        </div>
                        <div className='nav'>
                            <ul>
                                <Link to='/' onClick={handleLogOut}>
                                    Log Out
                                </Link>
                            </ul>
                        </div>
                    </div>
                    <nav className={sidebar ? 'nav-menu-sidebar active' : 'nav-menu-sidebar'}>
                        <ul className='nav-menu-sidebar-items' onClick={showSidebar}>
                            <li className='navbar-toggle'>
                                <Link to='#' className='menu-bars'>
                                    <AiIcons.AiOutlineClose />
                                </Link>
                            </li>
                            <SideBar userRole={userRole}/>
                        </ul>
                    </nav>
                </IconContext.Provider>
            </>
        );
    } else if(userRole === "Admin"){
        return (
            <>
                <IconContext.Provider value={{ color: 'white' }}>
                    <div className='nav'>
                        <div className='navBarProfilePage'>
                            <Link to='#' className='menu-bars'>
                                <FaIcons.FaBars onClick={showSidebar} />
                            </Link>
                        </div>
                        <div className='nav'>
                            <ul>
                                <Link to='/' onClick={handleLogOut}>
                                    Log Out
                                </Link>
                            </ul>
                        </div>
                    </div>
                    <nav className={sidebar ? 'nav-menu-sidebar active' : 'nav-menu-sidebar'}>
                        <ul className='nav-menu-sidebar-items' onClick={showSidebar}>
                            <li className='navbar-toggle'>
                                <Link to='#' className='menu-bars'>
                                    <AiIcons.AiOutlineClose />
                                </Link>
                            </li>
                            {AdminSideBar.map((item, index) => {
                                return (
                                    <li key={index} className={item.cName} >
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </IconContext.Provider>
            </>
        );
    }
}