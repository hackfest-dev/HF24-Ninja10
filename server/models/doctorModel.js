import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const doctorSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'a doctor must have a name'],
    },
    email: {
        type: String,
        required: [true, 'please provide email'],
        unique: [true, 'this email is already registered'],
        lowercase: true,
        validate: [validator.isEmail, 'invalid email'],
    },
    password: {
        type: String,
        required: [true, 'please provide password'],
    },
    gender: {
        type: String,
        required: [true, 'please provide gender'],
        enum: ['male', 'female', 'others'],
    },
    address: {
        type: String,
        required: [true, 'please provide address'],
    },
    experience: {
        // years of experience
        type: Number,
        required: [true, 'please provide years of experience'],
    },
    speciality: {
        type: String,
        required: [true, 'please provide speciality'],
    },
    photo: String, // url for photo
});

doctorSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 11);
    next();
});

doctorSchema.methods.checkPasswordAtLogin = async function (inputPwd) {
    return await bcrypt.compare(inputPwd,this.password);
};

doctorSchema.methods.generateWebToken = async function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY)
}

const Doctor = mongoose.model('doctors', doctorSchema);

export default Doctor;
