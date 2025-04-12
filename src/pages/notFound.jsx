// path: src/pages/NotFound.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/commonComponents/Button';
const NotFound =()=>{
    const navigate = useNavigate();
    return (
        <div style={{padding:'50px',textAlign:'center'}}>
            <h1>404 Not Found</h1>
            <p>Sorry, the page you are looking for does not exist</p>
            <Button onClick={() => navigate("/")}> Go to Home </Button>
        </div>
    )
}
export default NotFound;