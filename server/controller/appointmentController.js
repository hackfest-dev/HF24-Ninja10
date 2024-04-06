import Appointment from './../models/appointmentModel.js';
import errorHandler from './../util/errorHandler.js';

export async function getAllAppointment(req, res) {
    try {
        const appointments = await Appointment.find();
        res.status(200).json({
            status: 'success',
            result: appointments.length,
            data: {
                appointments,
            },
        });
    } catch (err) {
        errorHandler(res, 500, 'internal server error');
    }
}

export async function getAppointement(req, res) {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.json({
                status: 'fail',
                message: 'no appointment',
            });
        }
        res.json({
            status: 'success',
            data: appointment,
        });
    } catch (err) {
        errorHandler(res, 500, 'internal server error');
    }
}

export async function createAppointment(req, res) {
    try {
        const appointment = await Appointment.create(req.body);
        res.status(200).json({
            status: 'success',
            data: appointment,
        });
    } catch (err) {
        errorHandler(res, 404, err.message);
    }
}

export async function updateAppointment(req, res) {
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
    } catch (err) {
        errorHandler(res, 404, err.message);
    }
}

export async function createAppointment(req, res) {
    try {
        const uid = req.id;
        const did = req.params.id;

        req.user = uid;
        req.patient = did;

        let appointment = await appointment.create(req.body());
        res.json({
            data: appointment,
            message: 'appointment booked succefully',
        });
    } catch (err) {
        res.json({
            message: err.message,
        });
    }
}

export async function deleteAppointment(req,res){
    try{

        let aid = req.params.id
        let appoint = await appointment.findByIdAndDelete(aid)
        if(!appoint){
            res.json({
                status:"fail",
                message:"no such appointment exist"
            })
        }
        else{   
            res.json({
                data:appoint,
                status:"success"
            })
        }

    }
    catch(err){
        res.json({
            status:"fail",
            message:err.message
        })
    }
}


async function checkVacancy(doctorId) {
    try {
        const currentDate = new Date();
        const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
        const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59);

        const appointmentCount = await Appointment.countDocuments({ doctor: doctorId, createdAt: { $gte: startOfDay, $lt: endOfDay } });
        return appointmentCount < 5;
    } catch (err) {
        console.error(err);
        return false; // Return false in case of any error
    }
}

export async function bookAppointment(req, res, next) {
    const doctorId = req.params.id;
    const patientId = req.id; 

    try {
        // Check if the doctor exists
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({
                message: "Doctor not found"
            });
        }

        // Check doctor's vacancy
        const isVacant = await checkVacancy(doctorId);
        if (!isVacant) {
            return res.status(400).json({
                message: "This doctor is fully booked for today. Please choose another doctor."
            });
        }

        const appointment = await Appointment.create({
            patient: patientId,
            doctor: doctorId,
            title: req.body.title,
            description: req.body.description
        });

        res.status(201).json({
            message: "Appointment booked successfully",
            appointment
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while booking the appointment"
        });
    }
}

export async function freeModel(req, res) {
    try {
        const allDoctors = await Doctor.find();
        
        const availableDoctors = await Promise.all(allDoctors.map(async (doctor) => {
            const isVacant = await checkVacancy(doctor._id);
            return isVacant ? doctor : null;
        }));

        const filteredDoctors = availableDoctors.filter(doctor => doctor !== null);

        res.json({
            status : 'success',
            doctors: filteredDoctors
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status : 'fail',
            message: "An error occurred while fetching available doctors."
        });
    }
};





