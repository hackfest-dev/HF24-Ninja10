import Equipment from './../models/equipmentModel';
import errorHandler from './../util/errorHandler';

export async function getAllEquipment(req, res) {
    try {
        const equipments = await Equipment.find();

        res.status(200).json({
            status: 'success',
            result: equipments.length,
            data: {
                equipments: equipments,
            },
        });
    } catch (err) {
        errorHandler(res, 500, 'internal server error');
    }
}

export async function getEquipment(req, res) {
    try {
        const id = req.params.id;

        const equipement = await Equipment.findById(id);

        if (!equipement) {
            return errorHandler(res, 404, 'invalid id');
        }

        res.status(200).json({
            status: 'success',
            data: {
                equipement: equipement,
            },
        });
    } catch (err) {
        errorHandler(res, 500, 'internal server error');
    }
}

export async function createEquipment(req, res) {
    try {
        const newEquipement = await Equipment.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                newEquipement,
            },
        });
    } catch (err) {
        return errorHandler(res, 404, err.message);
    }
}

export async function updateEquipment(req, res) {
    try {
        const updatedEquipment = await Equipment.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // returns new object if set true
            runValidators: true,
        });

        if (!updatedEquipment) {
            return errorHandler(res, 404, 'invalid id');
        }

        res.status(200).json({
            status: 'success',
            data: {
                equipement: updatedEquipment,
            },
        });
    } catch (err) {
        errorHandler(res, 500, 'internal server error');
    }
}

export async function deleteEquipment(req, res) {
    try {
        await Equipment.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (err) {
        errorHandler(res, 500, 'internal server error');
    }
}
