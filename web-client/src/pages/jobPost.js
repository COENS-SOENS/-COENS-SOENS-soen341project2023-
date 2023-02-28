import React from 'react'
import { Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import NavBar from '../Components/NavBars/authorizedNavBar'

export const JobPost = (props) => {

  const location = useLocation();
  const data = location.state.data;
  const {navigation} = props;
  return (
    <>
  <NavBar/>
    <div>Job Post</div>
    <h1>
    {data.data.Job}
    </h1>
    <h2>
    {data.data.Company}
    </h2>
    <h3>
    ${data.data.Salary}
    </h3>
    <h4>
    {data.data.Description}
    </h4>
    </>
  )
}
