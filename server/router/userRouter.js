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


user.route("/")
.post(registerPatient)
.get(getAll)



user.use(protectRoute);

user.route("/:id")
.get(getUser)
.patch(updateUser)
.delete(deleteUser)

user.get('/logout', logout);


user.use(isAuthorized, ['admin']);

user.delete('/:id', deleteUser);

export default user;
