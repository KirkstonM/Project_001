import React, { useState } from "react";
import './login.css';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {Form, Container, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';



export default function Login(){

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
   
    const nav = useNavigate();

async function handleSubmit(e){
    e.preventDefault();
    let regobj = {email, password};
    try {
       await fetch('http://localhost:3001/login', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body : JSON.stringify(regobj)
        })
       .then(res => res.json())
       .then(data => {
        if(data.error) {
            toast.error(data.error);
        } else {
            toast.success(data.message)
            window.localStorage.setItem("token", data.data);
            window.localStorage.setItem("loggedIn", true);
            nav('/home')
        }
       })
    } catch (error) {
        toast.error(error)
    }
}

    return(
        <>
        <section>
            <div className="login-header-section">
            <h1> Login </h1>
                    <h5> Don't have an account ?
                       <Link to='/' className="span"> Register here </Link>
                        </h5>
        </div>

        <div className="login-form">
            <Container>
        <Form onSubmit={handleSubmit}>
            
        <Form.Label className='mt-4' style={{fontWeight: "bold"}}> Email <span> * </span></Form.Label>
            <Form.Control
            type='email'
            name="email"
            value={email}
            placeholder='registered email address'
            onChange={(e) => setEmail(e.target.value)}
            />

            <Form.Label className='mt-4' style={{fontWeight: "bold"}}> Password <span> * </span></Form.Label>

            <Form.Control 
            type='password'
            name="password"
            value={password}
            placeholder='registered password'
            onChange={(e) => setPassword(e.target.value)}
            className='mt-4'
            />

            <Button type="submit" className='login-btn mt-5'> Submit </Button>
        </Form>

        </Container>
        </div>
        </section>
        </>
    )
};