import express from 'express'
import {createUser, LoginUser, getUserData} from '../controls/userControl.js';


const router = express.Router();

// REGISTER ROUTE : http://localhost:3001/login
router.post('/register', createUser);

// LOGIN ROUTE : http://localhost:3001/login
router.post('/login', LoginUser);

// Get USER DETAILS ROUTE : http://localhost:3001/userData
router.post('/userData', getUserData);



export default router;