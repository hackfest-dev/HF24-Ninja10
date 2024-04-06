import express from 'express';
import {
    createAppointment,
    deleteAppointment,
    getAllAppointment,
    getAppointement,
    updateAppointment,
    freeModel,
    // paidModel,
    bookAppointment,
} from '../controller/appointmentController.js';

import { protectRoute } from './../controller/userController.js';

const router = express.Router();

router.get('/freeApointment', freeModel);
// router.get('/paidApointment', paidModel);

router.route('/').post(createAppointment).get(getAllAppointment);

router.use(protectRoute);

router.get('/book', bookAppointment);

router
    .route('/:id')
    .get(getAppointement)
    .patch(updateAppointment)
    .delete(deleteAppointment);

export default router;
