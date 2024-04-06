import express from 'express';
import {
    createUser,
    login,
    protectRoute,
    logout,
    deleteUser,
    isAuthorized,
    getAllUser,
    getUser,
    updateUser,
} from '../controller/userController.js';

const user = express.Router();

user.route('/').post(createUser).get(getAllUser);

user.use(protectRoute);

user.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

user.get('/logout', logout);

user.use(isAuthorized(['admin']));

user.delete('/:id', deleteUser);

export default user;
