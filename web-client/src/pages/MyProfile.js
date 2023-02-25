import React, { useState, useEffect } from 'react';
import userAvatar from '../assets/user-avatar.jpg';
import { Link, Router, useNavigate } from "react-router-dom";
import NavBarProfilePage from '../components/NavBarProfilePage';
import { Button } from 'react-bootstrap';
import '../components/NavBarProfilePage.css'
import { firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useUserAuth } from '../firebase/UserAuthContext';

export default function MyProfile() {
    const current_user = useUserAuth();
    const uid = current_user ? current_user.uid : null;
    const userRef = doc(firestore, "Users", uid);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [city, setCity] = useState("");
    const [bio, setBio] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            const userDoc = await getDoc(userRef);
            const data = userDoc.data();
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setEmail(data.email);
            setRole(data.role);
            setCity(data.city);
            setBio(data.bio);
            setIsLoading(false);
        }
        if (uid) {
            fetchUser();
        } else {
            setIsLoading(false);
        }
    }, [userRef, uid]);

    return (
        <div>
            {isLoading ? (
                <div className="profile-placeholder">
                    <div className="avatar-placeholder"></div>
                    <div className="name-placeholder"></div>
                    <div className="info-placeholder"></div>
                </div>
            ) : (
                <div className="profile-container">
                    <div className="avatar-container">
                        <img src={userAvatar} alt="User Avatar" className="avatar" />
                    </div>
                    <div className="user-info">
                        <h2 className="user-name">{`${firstName} ${lastName}`}</h2>
                        <p className="user-role">{role}</p>
                        <p className="user-location">{city}</p>
                        <Button variant="primary" className="edit-profile-btn">
                            Edit Profile
                        </Button>
                    </div>
                    <div className="user-bio">
                        <h3>Bio</h3>
                        <p>{bio}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
