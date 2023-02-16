import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    address : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    phoneNumber : {
        type: Number,
        required: true
    },
    plateNumber : {
        type: String,
        required: true,
        unique: true
    },
    fuelType: {
        type: String,
        required: true
    },
},
{ timestamps : true }
);

const userModal = mongoose.model('practices', userSchema);

export default userModal;