import Doctor from './../models/doctorModel';
import errorHandler from './../util/errorHandler';

export async function getAllDoctor(req, res) {
    try {
        const doctors = await Doctor.find();
        res.status(200).json({
            status: 'success',
            result: doctors.length,
            data: {
                doctors: doctors,
            },
        });
    } catch (err) {
        errorHandler(res, 404, err.message);
    }
}

export async function getDoctor(req, res) {
    try {
        const doctor = await Doctor.findById(req.params.id);

        if (!doctor) {
            return errorHandler(res, 404, 'invalid id');
        }
        res.status(200).json({
            status: 'success',
            data: {
                doctor: doctor,
            },
        });
    } catch (err) {
        errorHandler(res, 500, 'internal server error');
    }
}

export async function createDoctor(req, res) {
    try {
        const doctor = await Doctor.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                doctor: doctor,
            },
        });
    } catch (err) {
        errorHandler(res, 404, err.message);
    }
}

export async function updateDoctor(req, res) {
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            status: 'success',
            data: {
                doctor: updatedDoctor,
            },
        });
    } catch (err) {
        errorHandler(res, 404, err.message);
    }
}

export async function deleteDoctor(req, res) {
    try {
        awaitDoctor.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (err) {
        errorHandler(res, 500, 'internal server error');
    }
}
