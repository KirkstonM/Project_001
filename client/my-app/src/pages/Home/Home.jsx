import React, { useEffect, useState } from "react";
import './home.css';
import {Button, Container} from 'react-bootstrap';
import { GrLogout } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

export default function Home(){
const navigate = useNavigate();
    
    const [userData, setUserData] = useState([]);

    useEffect(() => {

        async function fetchUsers(){
            await fetch('http://localhost:3001/userData', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token : window.localStorage.getItem("token")
                }),
            })
            .then(res => res.json())
            .then(data => setUserData(data.data))
        }
fetchUsers();
    }, [])

    function logOut(){
        window.localStorage.clear();
        navigate('/login')

    }
    return(

        <>
        <section className="home-header">
            <div className="navbar">
                <img src="./navicon.png" className="logo-icon" />
                <p onClick={logOut}> logout <GrLogout style={{marginLeft: "0.8rem", color: "white"}}/> </p>
            </div>
            
            <Container>
                <div className="user-profile">
                    <div className=' card profile--card'>
                        <div className="profile-image">
                            <img src="./user-img.png"  className='user-img'/>
                        </div>
                        <div className="name">
                            <h2>{userData.firstName} &nbsp;{userData.lastName}</h2>
                        </div>
                        <div className="profile-details">
                            <h2> {userData.plateNumber} </h2>
                        </div>
                        <div className="profile-credentials">
                            <h5>Email : 
                            <span> {userData.email} </span>
                            </h5>

                            <h5>Phone Number: 
                            <span>{userData.phoneNumber}</span>
                            </h5>

                            <h5>Address : 
                            <span>{userData.address}</span>
                            </h5>

                            <h5>Fuel Type Requested :
                            <span>{userData.fuelType}</span>
                            </h5>
                        </div>
                    </div>

                    <div className="request-quota-section">
                        <Button> Request Quota </Button>
                        <div className="quota-balance">
                            <h3>Quota balance : 0 </h3>
                        </div>
                    </div>
                </div>
            </Container>
            </section> 
        </>
    )
};