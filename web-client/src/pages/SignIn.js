import React from 'react';
import { useNavigate } from "react-router-dom";
function SignIn() {
const history = useNavigate();
const navigateTo = () => history.push('/ProfilePage');//eg.history.push('/login');

    return (
    <div>
    <button onClick={navigateTo} type="button" />
    </div>
    );
}
export default SignIn;