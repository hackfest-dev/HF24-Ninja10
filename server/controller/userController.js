import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const createUser = async function (req, res) {
    const { name, email, phone, password, gender, dob, role } = req.body;

    if (!name || !email || !phone || !password || !gender || !dob || !role) {
        return res.status(400).json({
            status: 'fail',
            message: 'Please fill all the details',
        });
    }

    try {
        await userModel.create({
            name,
            email,
            phone,
            password,
            gender,
            dob,
            role,
        });
        res.json({
            data: req.body,
            message: 'User signed up successfully',
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message,
        });
    }
};

const login = async function (req, res) {
    try {
        let { email, password, role } = req.body;
        email = email.toLowerCase();

        console.log(req.body);
        if (!email || !password || !role) {
            return res.status(400).json({
                message: 'Please fill all the details',
            });
        }

        const user = await userModel.findOne({ email }).select('+password');

        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found',
            });
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({
                status: 'fail',
                message: 'Incorrect email or password',
            });
        }

        if (role !== user.role) {
            return res.status(403).json({
                status: 'fail',
                message: 'User with this role is not authorized',
            });
        }

        let token = user.generateJsonWebToken();
        res.cookie('login', token, { httpOnly: true });
        let ck = req.cookies.login;
        console.log(ck);

        res.json({
            status: 'success',
            status: `${user.name} logged in succesfully`,
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message,
        });
    }
};

const protectRoute = async function (req, res, next) {
    try {
        const token = req.cookies.login;

        if (!token) {
            return res.status(401).json({
                status: 'fail',
                message: 'Token not found, authorization denied',
            });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!payload) {
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid token, authorization denied',
            });
        }

        const user = await userModel.findById(payload.id);

        if (!user) {
            return res.status(401).json({
                status: 'fail',
                message: 'User not found, authorization denied',
            });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({
            status: 'fail',
            message: 'Invalid token, authorization denied',
        });
    }
};

const logout = async function (req, res) {
    try {
        res.cookie('login', ' ', { maxAge: 1 });
        res.json({
            status: 'success',
            message: 'user logged out succesfully',
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message,
        });
    }
};

const isAuthorized = function (roles) {
    return async function (req, res, next) {
        if (roles.includes(req.role)) {
            next();
        } else {
            res.status(401).json({
                message: 'Unauthorized',
            });
        }
    };
};

const updateUser = async function (req, res) {
    try {
        const user = await userModel.findById(req.id);
        const obj = req.body;
        for (const key in obj) {
            user[key] = obj[key];
        }
        await user.save();
        res.json({
            status: 'success',
            message: 'User updated successfully',
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
};

const deleteUser = async function (req, res, next) {
    try {
        let uid = req.params.id;
        let user = await userModel.findByIdAndDelete(uid);
        if (!user) {
            res.status(404).json({
                status: 'fail',
                message: 'no such user exist',
            });
        } else {
            res.status(200).json({
                status: 'success',
                data: user,
            });
        }
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message,
        });
    }
};

const getUser = async function (req, res) {
    try {
        const uid = req.params.id;
        const user = await userModel.findById(uid);
        if (!user) {
            res.json({
                staus: 'fail',
                message: 'no such user exist',
            });
        }
        res.json({
            data: user,
            status: 'succes',
        });
    } catch (err) {
        res.json({
            status: 'fail',
            message: err.message,
        });
    }
};

const getAllUser = async function (req, res) {
    try {
        let user = await userModel.find();
        if (!user) {
            res.json({
                status: 'fail',
                message: 'No user exist',
            });
        }
        res.json({
            data: user,
            status: 'success',
        });
    } catch (err) {
        res.json({
            status: 'fail',
            message: err.message,
        });
    }
};

export {
    createUser,
    login,
    protectRoute,
    logout,
    deleteUser,
    updateUser,
    getUser,
    getAllUser,
    isAuthorized,
};
