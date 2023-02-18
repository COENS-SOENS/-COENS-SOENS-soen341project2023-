import React, {useRef} from "react";
import {firestore} from "../firebase/firebase";
import { addDoc, collection } from "@firebase/firestore";
import NavBar from '../Componenets/NavBars/navigationBar';

export default function Home() {

    const messageRef = useRef();
    const ref = collection(firestore,"messages");

    const handleSave = async(e) => {
        e.preventDefault();//so page doesn;t refresh when save button is clicked
        console.log(messageRef.current.value);

        let data = {
            message: messageRef.current.value,
        };
        try {
            addDoc(ref, data)
        }catch (e) {
            console.log(e);
        }
    }


    return (
        <div>
            <NavBar/>
            <form onSubmit={handleSave}>
                <label>Enter Message</label>
                <input type="text" ref={messageRef}/>
                <button type="submit">Save</button>
            </form>
        </div>
    );
}