import React from "react";
import * as CgIcons from 'react-icons/cg';
import * as RxIcons from 'react-icons/rx';
import * as CiIcons from 'react-icons/ci';
import * as FiIcons from 'react-icons/fi';

export const AdminSideBar = [
    {
        title: 'Dashboard',
        path: '/home',
        icon: <CgIcons.CgWorkAlt />,
        cName: 'nav-text',
      
    },
    {
        title: 'Admin Profile',
        path: '/AdminProfile',
        icon: <CgIcons.CgProfile />,
        cName: 'nav-text',
           
    },

];