import express from 'express';
import errorHandler from '../util/errorHandler';
import { createAppointment, getAllAppointment,updateEquipment,deleteEquipment } from '../controller/appointmentController';
import { protectRoute } from '../controller/userController';

const equpipment = express.Router();

equpipment.route("/")
.get(getAllAppointment)
.post(createAppointment)

equpipment.use(protectRoute)

equpipment.route("/:id")
.patch(updateEquipment)
.delete(deleteEquipment)


