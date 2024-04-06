import express from 'express';
import {
    createEquipment,
    getAllEquipment,
    updateEquipment,
    deleteEquipment,
} from '../controller/equipmentController.js';
import { protectRoute } from '../controller/userController.js';

const equpipment = express.Router();

equpipment.route('/').get(getAllEquipment).post(createEquipment);

equpipment.use(protectRoute);

equpipment.route('/:id').patch(updateEquipment).delete(deleteEquipment);

export default equpipment;
