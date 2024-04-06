import Doctor from '../models/doctorModel.js';
import doctorModel from '../models/doctorModel.js'; // same as doctor
import appointmentModel from '../models/appointmentModel.js';

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
        const updatedDoctor = await Doctor.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

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

// const getAllDoctor = async function (req, res) {
//     try {
//         let doctors = await doctorModel.find();
//         if (!doctors) {
//         } else {
//             res.json({
//                 data: doctors,
//                 status: 'succesfull',
//             });
//         }
//     } catch (err) {
//         res.json({
//             status: fail,
//             message: err.message,
//         });
//     }
// };

const checkPatientAppointment = async function (req, res) {
    try {
        let pid = req.params.id;
        let patient = await appointmentModel.find({ patient: pid });
        if (patient) {
            res.json({
                data: patient,
                status: 'success',
            });
        } else {
            res.json({
                message: 'no appointment exist',
            });
        }
    } catch (err) {
        res.json({
            status: 'fail',
            message: err.message,
        });
    }
};
