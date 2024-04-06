import express from 'express';
import {
    registerPatient,
    login,
    protectRoute,
    logout,
    deleteUser,
    isAuthorized,
} from '../controller/userController.js';

const user = express.user();

user.post('/register', registerPatient);
user.post('/login', login);

user.use(protectRoute);
user.get('/logout', logout);
user.patch('/:id',updateUser)

user.use(isAuthorized, ['admin']);

user.delete('/:id', deleteUser);



export default user;
