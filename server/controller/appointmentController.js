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


