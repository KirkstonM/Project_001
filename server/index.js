import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';



const app = express();

//middleware
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
dotenv.config();

//database set up
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
},
() =>  console.log('connected to the database'));


//server setup
const PORT = process.env.PORT || 5000;

app.use('/', userRoute);


app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
});