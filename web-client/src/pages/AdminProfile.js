import React, { useState, useEffect } from 'react';
import userAvatar from '../assets/user-avatar.jpg';
import NavBarProfilePage from '../Components/NavBars/NavBarProfilePage';
import { Button } from 'react-bootstrap';
import '../Components/NavBars/NavBarProfilePage.css';
import { auth, firestore } from '../firebase/firebase';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Wrapper from "../assets/wrappers/ProfilePageFormPage";
import FormRow from "../Components/FormRow"

export default function AdminProfile() {

    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [isLoading, setIsLoading] = useState(true);
  
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                const snapshot = await getDoc(doc(firestore, "Users", uid));
                if (snapshot.exists()) {
                    setUser(snapshot.data())
                    setFirstName(snapshot.data().firstName)
                    setLastName(snapshot.data().lastName)
                    setEmail(snapshot.data().email)
                    setRole(snapshot.data().role)
                
                } else {
                    console.log("User doc missing")
                }
            } else {
                console.log("User not logged in")
                setUser(null);
            }
            setIsLoading(false);
        });
    }, []);

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
   
    const handleSaveChanges = async (event) => {
        event.preventDefault();
        if (!isEditing) {
            return;
        }
        const uid = auth.currentUser.uid
        const userRef = doc(firestore, "Users", uid)
        const updatedUser = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            role: role
        }

        await updateDoc(userRef, updatedUser);
        setUser(updatedUser);
        setIsEditing(false);
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <NavBarProfilePage />
            <Wrapper>
                <form className='form' onSubmit={handleSaveChanges}>
                    <h3>Admin Profile</h3>
                    <div className="avatar-container">
                            <img src={userAvatar} alt="User Avatar" className="avatar" />
                        </div>
                    <div className='form-center'>
                        <FormRow type="text" name="First name" value={firstName} handleChange={handleFirstNameChange} disabled={!isEditing} />
                        <FormRow type="text" name="Last name" value={lastName} handleChange={handleLastNameChange} disabled={!isEditing} />
                        <FormRow type="text" name="Email Address" value={email} handleChange={handleEmailChange} disabled={!isEditing} />
                    
                    </div>
                    <span>{<br />}</span>
                    <Button variant="primary" onClick={() => setIsEditing(!isEditing)} style={{ marginRight: "10px" }}>
                        {isEditing ? "Cancel" : "Edit"}
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges} style={{ marginRight: "10px" }}>
                        Save
                    </Button>
                    
                </form>
            </Wrapper>
        </div>
    );
}
