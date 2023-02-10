import React from "react";
import * as CgIcons from 'react-icons/cg';
import * as RxIcons from 'react-icons/rx';
import * as CiIcons from 'react-icons/ci';
import * as FiIcons from 'react-icons/fi';


export const SideBar = [
    { 
        title: 'My Job Feed',
        path: '/',
        icon: <CgIcons.CgWorkAlt />,
        cName: 'nav-text'
    },
    {
        title: 'My Profile',
        path: '/',
        icon: <CgIcons.CgProfile />,
        cName: 'nav-text'        
    },
    {
        title: 'Dashboard',
        path: '/',
        icon: <RxIcons.RxDashboard />,
        cName: 'nav-text'
    },
    {
        title: 'Saved Jobs',
        path: '/',
        icon: <CiIcons.CiSaveDown2 />,
        cName: 'nav-text'
    },
    {
        title: 'Settings',
        path: '/',
        icon: <FiIcons.FiSettings />,
        cName: 'nav-text'
    },
];