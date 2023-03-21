import React, { createContext, useState } from 'react';
import ApplicantQuery from './applicantQuery';
import MyProfile from '../pages/MyProfile';

export const CandidateContext = React.createContext();

export function CandidateProvider ({ children }) {
    const [selectedCandidate, setSelectedCandidate] = useState([]);

    return (
        <CandidateContext.Provider value={{ selectedCandidate, setSelectedCandidate}}>
            {children}
        </CandidateContext.Provider>

    
    );
};
