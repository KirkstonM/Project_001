import userModal from "../modal/userModal.js";
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt7239";

export const createUser = async(req, res) => {
    try {
        const {
firstName,
lastName,
address,
password,
email,
phoneNumber,
plateNumber,
fuelType
        } = req.body

    const existingUser = await userModal.findOne({ plateNumber : plateNumber })
    if(existingUser){
        return res.status(400).send({ message : "Number plate is already registered" })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = new userModal({
        firstName,
lastName,
address,
password : hashedPassword,
phoneNumber,
plateNumber,
fuelType,
email
    })

    user.save();
    res.status(201).send({ message : "user created"})
    } catch (error) {
        res.status(500).send({ message: "Internal error" })
    }
};

//LOGIN USERS

export const LoginUser = async(req, res) => {
    

    try {
        const {email, password} = req.body
        const user = await userModal.findOne({ email : email })
        if (!user) {
            return res.json({ error: "Email Not Found" });
          }
          if (await bcrypt.compare(password, user.password)) {
            const token = JWT.sign({ email: user.email  }, JWT_SECRET);
        
            if (res.status(201)) {
              return res.json({ status: "ok", data: token, message: "Logged in" });
            } else {
              return res.json({ error: "error" });
            }
          }
          res.json({ status: "error", error: "Invalid Password" });
         
    } catch (error) {
        res.status(500).send({ message : error.message });
    }
};

//GET THE LOGGED IN USER DETAILS

export const getUserData = async(req, res) => {
    try {
        const { token } = req.body;
        const user = JWT.verify(token, JWT_SECRET, (err, res) => {
            if (err) {
              return "token expired";
            }
            return res;
          });

          console.log(user);
      if (user == "token expired") {
        return res.send({ status: "error", data: "token expired" });
      }
      const userEmail = user.email;
      userModal.findOne({ email: userEmail })
        .then((data) => {
          res.send({ status: "ok", data: data });
        })
        .catch((error) => {
          res.send({ status: "error", data: error });
        });

    } catch (error) {
        res.status(500).send({ message : error.message });
    }
};