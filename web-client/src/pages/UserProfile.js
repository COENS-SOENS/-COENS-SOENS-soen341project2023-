import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import NavBarProfilePage from '../components/NavBarProfilePage';
import { Button } from 'react-bootstrap';
import '../components/NavBarProfilePage.css'
import MyProfile from '../pages/MyProfile';
import Dashboard from '../pages/dashboard';

export default function UserProfile() {
    const navigate = useNavigate();
    const [selectedPage, setSelectedPage] = useState('My Profile');

    function handleSideBarClick(page) {
        setSelectedPage(page);
    }

    let pageContent = null;

    switch (selectedPage) {
        case 'My Profile':
            pageContent = <MyProfile />;
            break;
        case 'Dashboard':
            pageContent = <Dashboard />;
            break;
        default:
            pageContent = <Dashboard />;
            break;
    }

    return (
        <div className="user-profile-wrapper">
            <NavBarProfilePage onSidebarClick={handleSideBarClick} />
            {pageContent}
        </div>
    );
}