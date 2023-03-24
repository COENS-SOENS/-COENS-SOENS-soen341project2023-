import React from "react";
import { Link } from 'react-router-dom';
import * as CgIcons from 'react-icons/cg';
import * as RxIcons from 'react-icons/rx';
import * as CiIcons from 'react-icons/ci';
import * as FiIcons from 'react-icons/fi';

export const SideBar = ({ userRole }) => {
    // Define different sets of sidebar items based on the user's role
    const userSidebarItems = [
        {
            title: "My Job Feed",
            path: "/home",
            icon: <CgIcons.CgWorkAlt />,
            cName: "nav-text",
        },
        {
            title: "My Profile",
            path: "/MyProfile",
            icon: <CgIcons.CgProfile />,
            cName: "nav-text",
        },
        {
            title: "Saved Jobs",
            path: "/saved-jobs",
            icon: <CiIcons.CiSaveDown2 />,
            cName: "nav-text",
        },
        {
            title: "Home",
            path: "/home",
            icon: <RxIcons.RxDashboard />,
            cName: "nav-text",
        },
        {
            title: "Settings",
            path: "/settings",
            icon: <FiIcons.FiSettings />,
            cName: "nav-text",
        },
    ];

    const employerSidebarItems = [
        {
            title: "My Job Feed",
            path: "/home",
            icon: <CgIcons.CgWorkAlt />,
            cName: "nav-text",
        },
        {
            title: "My Profile",
            path: "/employers-profile-page",
            icon: <CgIcons.CgProfile />,
            cName: "nav-text",
        },
        {
            title: "Home",
            path: "/home",
            icon: <RxIcons.RxDashboard />,
            cName: "nav-text",
        },
        {
            title: "Settings",
            path: "/settings",
            icon: <FiIcons.FiSettings />,
            cName: "nav-text",
        },
    ];

    const sidebarItems = userRole === "Employer" ? employerSidebarItems : userSidebarItems;
    return (
        <>
            <div className="sidebar">
                <ul className="nav-menu-items">
                    <li className="navbar-toggle">
                        <h2>My App</h2>
                    </li>
                    {sidebarItems.map((item, index) => (
                        <li key={index} className={item.cName}>
                            <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );

};
