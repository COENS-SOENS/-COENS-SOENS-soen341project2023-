
import React, { useState, useEffect } from 'react';
import userAvatar from '../assets/user-avatar.jpg';
import NavBarProfilePage from '../Components/NavBars/NavBarProfilePage';
import { Button } from 'react-bootstrap';
import '../Components/NavBars/NavBarProfilePage.css';
import './MyProfile.css'
import { auth, firestore } from '../firebase/firebase';
import { doc, getDoc, updateDoc,collection, query, where, getDocs, writeBatch} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Wrapper from "../assets/wrappers/ProfilePageFormPage";
import FormRow from "../Components/FormRow"
import { storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function EmployerProfilePage() {
    const [user, setUser] = useState(null);
    const [companyName, setCompanyName] = useState("");
    const [email, setEmail] = useState("");
    const [vision, setVision] = useState("");
    const [sector, setSector] = useState("");
    const [location, setCompanyLoaction] = useState("");


    const [role, setRole] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [companyLogo, setCompanyLogo] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                const snapshot = await getDoc(doc(firestore, "Users", uid));
                if (snapshot.exists()) {
                    setUser(snapshot.data())
                    setEmail(snapshot.data().email)
                    setRole(snapshot.data().role)
                    setCompanyName(snapshot.data().companyName)
                    setCompanyLogo(snapshot.data().logoUrl)
                    setVision(snapshot.data().vision)
                    setCompanyLoaction(snapshot.data().location)
                    setSector(snapshot.data().sector)
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
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const handleCompanyNameChange = (event) => {
        setCompanyName(event.target.value);
    }
    const handleSectorChange = (event) => {
        setSector(event.target.value);
    }
    const handleVisionChange = (event) => {
        setVision(event.target.value);
    }
    const handleLocationChange = (event) => {
        setCompanyLoaction(event.target.value);
    }
    const handleCompanyLogo = async(event) => {
        const file = event.target.files[0];
        if (!file) {
            alert("Please choose a file to upload first !");
        }
        const uid = auth.currentUser.uid;
        const fileExtensionRegex = /(\.jpg|\.jpeg|\.png)$/i;
        const fileExtension = file.name.match(fileExtensionRegex)[0];
        const storageRef = ref(storage, `companyLogo/${uid}.${fileExtension}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        const userRef = doc(firestore,"Users", uid);
        const updatedUser = {...user,
            logoUrl: url,
            vision: vision,
            location: location,
            sector: sector};
        await updateDoc(userRef, updatedUser);
        setCompanyLogo(url);
        setUser(updatedUser);
        setSector(sector);
        setVision(vision);
        setCompanyLoaction(location);
        alert("Logo of the company added successfully !");
    };
    const handleSaveChanges = async (event) => {
        event.preventDefault();
        if (!isEditing) {
            return;
        }
        console.log("State variables before update:", { vision, sector, location }); // log the state variables
        const uid = auth.currentUser.uid;
        const userRef = doc(firestore, "Users", uid);
        
        const postingRef =collection(firestore,'Postings');
        console.log(postingRef);
        
        const query_ = query(postingRef, where("EmployerUID","==",user.uid));
        const querySnapshot = await getDocs(query_);
        const batch = writeBatch(firestore);
        querySnapshot.forEach(doc => {
            const docRef = doc.ref;
            batch.update(docRef, {Company:companyName,CompanyLogo: companyLogo,
            vision:vision,
            sector:sector,
            location:location});
        });
        await batch.commit();
        const updatedUser = {
            email: email,
            role: role,
            companyName: companyName,
            logoUrl: companyLogo,
            sector: sector,
            vision: vision,
            location: location
        }
    
        await updateDoc(userRef, updatedUser);
        setUser(updatedUser);
        setIsEditing(false);
        setVision(vision);
        setSector(sector);
        setCompanyLoaction(location);
        console.log("State variables after update:", { vision, sector, location }); // log the state variables
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
                        <div className="avatar-container">
                                <label htmlFor='company-logo-file-input'>
                                    <img src={companyLogo ? companyLogo : userAvatar} alt="Company logo"        className="logo" />
                                    </label>
                        </div>
                        <span>{<br />}</span>
                        <span>{<br />}</span>
                        <span>{<br />}</span>
                        <FormRow type="text" name="Email Address" value={email} handleChange={handleEmailChange} disabled={!isEditing} />
                        <span>{<br />}</span>
                        <span>{<br />}</span>
                        <FormRow type="text" name="Company Name" value={companyName} handleChange={handleCompanyNameChange} disabled={!isEditing} />
                        <span>{<br />}</span>
                        <span>{<br />}</span>
                        <FormRow type="text" name="Industry/Sector" value={sector} handleChange={handleSectorChange} disabled={!isEditing} />
                        <span>{<br />}</span>
                        <span>{<br />}</span>
                        <FormRow type="text" name="Vision" value={vision} handleChange={handleVisionChange} disabled={!isEditing} />
                        <span>{<br />}</span>
                        <span>{<br />}</span>
                        <FormRow type="text" name="Location" value={location} handleChange={handleLocationChange} disabled={!isEditing} />
                    </div>
                    <Button variant="primary" onClick={() => setIsEditing(!isEditing)} style={{ marginRight: "10px" }}>
                        {isEditing ? "Cancel" : "Edit"}
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges} style={{ marginRight: "10px" }}>
                        Save
                    </Button>
                    <label htmlFor="logo-upload" className="btn btn-primary">
                        Edit Company's Logo
                        <input
                            type="file"
                            id="logo-upload"
                            accept=".jpg, .jpeg, .png"
                            onChange={handleCompanyLogo}
                            style={{ display: "none" }} />
                    </label>
                </form>
            </Wrapper>
        </div>
    );
}
