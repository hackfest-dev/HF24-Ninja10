import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'please provide email'],
        unique: [true, 'this email is already registered'],
        lowercase: true,
        validate: [validator.isEmail, 'invalid email'],
    },
    name: {
        type: String,
        required: [true, 'please provide your name'],
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'please provide password'],
        minlength: [8, 'password should have atleast 8 charters'],
        select: false,
    },
    dob: {
        type: Date,
        required: [true, 'please provide your date of birth'],
    },
    gender: {
        type: String,
        lowercase: true,
        enum: ['male', 'female', 'others'],
        required: [true, 'please provide your gender'],
    },
    role: {
        type: String,
        default: 'patient',
        enum: ['admin', 'patient'],
    },
    photo: String,
    createdAt: Date,
});

userSchema.pre('save', async function (next) {
    if (!isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 11);
    this.createdAt = Date.now();

    next();
});

userSchema.methods.checkPasswordAtLogin = async function (inputPwd, actualPwd) {
    return await bcrypt.compare(inputPwd, actualPwd);
};

const Users = mongoose.Model('users', userSchema);

module.exports = Users;
