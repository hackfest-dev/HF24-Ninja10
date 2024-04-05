import express from 'express';
import * as doctorController from './../controller/doctorController.js';

const router = express.Router();

router
    .route('/')
    .get(doctorController.getAllDoctor)
    .post(doctorController.createDoctor);

router
    .route('/:id')
    .get(doctorController.getDoctor)
    .patch(doctorController.updateDoctor)
    .delete(doctorController.deleteDoctor);

export default router;
