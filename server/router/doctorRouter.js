import express from 'express';
import * as doctorController from './../controller/doctorController.js';


const router = express.Router();


router.route('/')
.get(doctorController.getAllDoctor)
.post(doctorController.createDoctor);


router.post("/login",doctorController.doctorLogin)   


//router.use(doctorController.protectRouteDoctor)

router.get("/logout",doctorController.doctorLogout)

router.get("/pendingAppointment",doctorController.pendingAppointment)

router.route('/:id')

.get(doctorController.getDoctor)

.patch(doctorController.updateDoctor).delete(doctorController.deleteDoctor);


export default router;
