
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
import { storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { CandidateContext } from '../Components/CandidateContext';
import { useContext } from 'react';

export default function MyProfile() {
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [resume, setResume] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const { selectedCandidate = () => {} } = useContext(CandidateContext) || {};

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
                    setCountry(snapshot.data().country)
                    setProvince(snapshot.data().province)
                    setAddress(snapshot.data().address)
                    setCity(snapshot.data().city)
                    setResume(snapshot.data().resume)
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

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    }
    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    }
    const handleProvinceChange = (event) => {
        setProvince(event.target.value);
    }
    const handleCityChange = (event) => {

        setCity(event.target.value);
    }
    const handleResumeUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            alert("Please choose a file to upload first !");
            //return;
        }
        // if the file exists,create a storage refrence that acts as a pointer to 
        // the file in the cloud. 
        const uid = auth.currentUser.uid;
        const storageRef = ref(storage, `resumes/${uid}.pdf`);
        await uploadBytes(storageRef, file);

        const downloadUrl = await getDownloadURL(storageRef);
        const userRef = doc(firestore, "Users", uid);
        const updatedUser = {
            ...user,
            resume: downloadUrl,
        };
        await updateDoc(userRef, updatedUser);
        setUser(updatedUser);
        alert("Resume Uploaded successfully !");
    };
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
            role: role,
            country: country,
            address: address,
            province: province,
            resume: user.resume,
            city: city
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
                    <h3>My Profile</h3>
                    <div className='form-center'>
                        <FormRow type="text" name="First name" value={firstName} handleChange={handleFirstNameChange} disabled={!isEditing} />
                        <FormRow type="text" name="Last name" value={lastName} handleChange={handleLastNameChange} disabled={!isEditing} />
                        <div className="avatar-container">
                            <img src={userAvatar} alt="User Avatar" className="avatar" />
                        </div>
                        <FormRow type="text" name="Email Address" value={email} handleChange={handleEmailChange} disabled={!isEditing} />
                        <FormRow type="text" name="Address" value={address} handleChange={handleAddressChange} disabled={!isEditing} />
                        <span>{<br />}</span>
                        <FormRow type="text" name="City" value={city} handleChange={handleCityChange} disabled={!isEditing} />
                        <FormRow type="text" name="State/Province" value={province} handleChange={handleProvinceChange} disabled={!isEditing} />
                        <span>{<br />}</span>
                        <FormRow type="text" name="Country" value={country} handleChange={handleCountryChange} disabled={!isEditing} />
                    </div>
                    <span>{<br />}</span>
                    <Button variant="primary" onClick={() => setIsEditing(!isEditing)} style={{ marginRight: "10px" }}>
                        {isEditing ? "Cancel" : "Edit"}
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges} style={{ marginRight: "10px" }}>
                        Save
                    </Button>
                    <label htmlFor="resume-upload" className="btn btn-primary">
                        Upload My Resume
                        <input
                            type="file"
                            id="resume-upload"
                            accept=".pdf"
                            onChange={handleResumeUpload}
                            style={{ display: "none" }} />
                    </label>
                    {selectedCandidate? (
                        <Button> Selected</Button>
                    ) :(
                        <Button> Not Selected</Button>
                    )}
                </form>
            </Wrapper>
        </div>
    );
}
