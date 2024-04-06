import express from 'express';
import {
    createAppointment,
    deleteAppointment,
    getAllAppointment,
   
    updateAppointment,
    freeModel,
    // paidModel,
    bookAppointment,
} from '../controller/appointmentController.js';

import { protectRoute } from './../controller/userController.js';

const router = express.Router();


router.route('/')
.post(createAppointment)
.get(getAllAppointment)

router.route("/:id")
.patch(updateAppointment)

router.get('/freeApointment', freeModel);
//router.use(protectRoute);

router.get('/book', bookAppointment);

export default router;
