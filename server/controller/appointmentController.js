import appointment from './../models/appointmentModel.js';
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
        if(!appointment){
            res.json({
                message:"no appointment"
            })
        }
        res.json({
            data:appointment,
            message:"all apointment fetched"
        })

    } catch (err) {
        errorHandler(res, 500, 'internal server error');
    }
}

export async function createAppointment(req,res){
    try{
        const uid = req.id
        const did = req.params.id
        
        req.user = uid;
        req.patient = did



    }
    catch(err){

    }
}
