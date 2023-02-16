import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import './register.css';
import {Link} from 'react-router-dom';


export default function Register() {

    const [formData, setFormData] = useState({
        firstName: "", lastName: "", address: "", password: "", email: "", phoneNumber: "", plateNumber: "", fuelType: ""
    });
    const [errors, setErrors] = useState({});

    //NAVIGATE THROUGH PAGE
    let navigate = useNavigate();

    //HANDLES THE CHANGING FORM DATA
    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        })
        )

        if (!!errors[name])
            setErrors({
                ...errors,
                [name]: null
            })
    };

    //SUBMIT FUNTION : POST REQUEST
    async function handleSubmit(e) {
        e.preventDefault();
        const formErrors = validateForm()
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors)
        } else {
            try {
                await fetch('http://localhost:3001/register', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        address: formData.address,
                        password: formData.password,
                        email: formData.email,
                        phoneNumber: formData.phoneNumber,
                        plateNumber: formData.plateNumber,
                        fuelType: formData.fuelType
                    })
                })
                    .then(res => {
                        if (res.ok === true) {
                            toast.success("Form submitted")
                            res.json();
                            navigate('/login')
                        } else if (res.ok === false) {
                            toast.error('Number plate is already registered')
                            //CHECK MONGO DATABASE CONNECTION
                        }

                    })
                    .then(data => {
                        console.log(data)
                    })
            } catch (error) {
                toast.error("Failed :" + error.message);
            }
        }
    }

    //handle errors
    function validateForm() {
        const { firstName, address, phoneNumber, plateNumber, fuelType, password, email } = formData
        const newErrors = {}

        if (!firstName || firstName === '')
            newErrors.firstName = "Please Add Your First Name"

        if (!address || address === '')
            newErrors.address = "Add your correct Address"

        if (!password || password === '' || password.length < 6)
            newErrors.password = "password length should be more than 6 characters"

        if (!phoneNumber || phoneNumber === '' || phoneNumber.length < 10)
            newErrors.phoneNumber = "Enter a valid phone number"

        if (!plateNumber || plateNumber === '')
            newErrors.plateNumber = "Enter a valid plate number"

        if (!fuelType || fuelType === 'Select')
            newErrors.fuelType = "Please select a fuel type"

        if (!email || email === '')
        newErrors.email = "Please enter a valid email"
        return newErrors
    }
    return (
        <>
            <section>
                <div className="register-header-section">
                    <h1> REGISTRATION </h1>
                    <h5> Already got an account ? 
                        <Link to='/login' className="span"> login here </Link>
                        </h5>
                </div>


                <div className="registration-form">
                    <Container>

                        <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs={12} sm={12} md={6}>
                                <Form.Label style={{fontWeight: "bold"}}> First Name <span> * </span></Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Ex: John'
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                isInvalid={!!errors.firstName}
                            />
                            <Form.Control.Feedback type="invalid"> {errors.firstName} </Form.Control.Feedback>
                            </Col>

                            <Col xs={12} sm={12} md={6}>
                            <Form.Label style={{fontWeight: "bold"}}> Last Name </Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Ex : Doe'
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className='lastName'
                            />
                            </Col>

                        </Row>
                        <Form.Label className='mt-4' style={{fontWeight: "bold"}}> Address <span> * </span></Form.Label>

                            <Form.Control
                                type='address'
                                placeholder='Ex : 84 Wilber St, Colombo'
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                isInvalid={!!errors.address}
                                

                            />
                            
                            <Form.Control.Feedback type="invalid"> {errors.address} </Form.Control.Feedback>
                        <Row>
                            <Col xs={12} sm={12} md={4}>
                            <Form.Label className='mt-4' style={{fontWeight: "bold"}}> Phone Number <span> * </span></Form.Label>

                            <Form.Control
                                type='number'
                                placeholder='Ex : 0771234567'
                                name='phoneNumber'
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                isInvalid={!!errors.phoneNumber}

                            />
                            <Form.Control.Feedback type="invalid"> {errors.phoneNumber} </Form.Control.Feedback>
                            </Col>

                            <Col xs={12} sm={12} md={4}>
                            <Form.Label className='mt-4' style={{fontWeight: "bold"}}> Plate Number <span> * </span></Form.Label>

                            <Form.Control
                                type='text'
                                placeholder='Ex: BQT 4494'
                                name='plateNumber'
                                value={formData.plateNumber}
                                onChange={handleChange}
                                isInvalid={!!errors.plateNumber}
                               

                            />
                            <Form.Control.Feedback type="invalid"> {errors.plateNumber} </Form.Control.Feedback>
                            </Col>

                            <Col xs={12} sm={12} md={4}>
                            <Form.Label className='mt-4' style={{fontWeight: "bold"}}> Fuel Type <span> * </span></Form.Label>


                            <Form.Select value={formData.fuelType} onChange={handleChange} name="fuelType"isInvalid={!!errors.plateNumber}>

                                <option> Select </option>
                                <option value="petrol" name="petrol"> petrol</option>
                                <option value="diesel" name="diesel"> diesel</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid"> {errors.fuelType} </Form.Control.Feedback>
                            </Col>
                            </Row>
                        <Row></Row>
                            <Col>
                            <Form.Label className='mt-4' style={{fontWeight: "bold"}}> Password <span> * </span></Form.Label>

                            <Form.Control
                                type='password'
                                placeholder='Enter a password'
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                isInvalid={!!errors.password}
                               

                            />
                            <Form.Control.Feedback type="invalid"> {errors.password} </Form.Control.Feedback>
                            </Col>

                        <Col>
                        <Form.Label className='mt-4' style={{fontWeight: "bold"}}> Email <span> * </span></Form.Label>

                        <Form.Control
                                type='email'
                                placeholder='Ex: random@gmail.com'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                isInvalid={!!errors.email}
                               

                            />
                            <Form.Control.Feedback type="invalid"> {errors.email} </Form.Control.Feedback>
                        </Col>

                            
                            <Button type="submit" className="mt-5 submit-btn"> submit </Button>
                        </Form>
                    </Container>
                </div>
            </section>
        </>
    )
};