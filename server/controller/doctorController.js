import Doctor from '../models/doctorModel.js';
import doctorModel from '../models/doctorModel.js'; // same as doctor
import appointmentModel from '../models/appointmentModel.js';
import errorHandler from '../util/errorHandler.js';
import UserModel from '../models/userModel.js';
import jwt from "jsonwebtoken"



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
export async function doctorLogin(req, res) {
    try {
        const { email, password } = req.body;
        const doctor = await doctorModel.findOne({ email }); // Find the doctor by email
        
        if (!doctor) {
            return res.status(401).json({
                status: "fail",
                message: "Doctor not found" // Return appropriate message if doctor is not found
            });
        }

        const isPasswordCorrect = await doctor.checkPasswordAtLogin(password); // Check if the password is correct

        if (isPasswordCorrect) {
            const token = await doctor.generateWebToken(); 
            res.cookie('doctorLogin', token, { httpOnly: true });

            return res.json({
                status: "success",
                message: "Login successful"
            });
        } else {
            return res.status(401).json({
                status: "fail",
                message: "Wrong credentials"
            });
        }
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}

export async function protectRouteDoctor(req,res,next){
    try{
        let token = await req.cookies.doctorLogin
       
        let payLoad = await jwt.verify(token,process.env.JWT_SECRET_KEY)
        
        if(payLoad){
            let doctor = await doctorModel.findById(payLoad.id)
            if(doctor){
                req.id = doctor._id
                next()
            }
            else{
                return res.status(401).json({ message: "Doctor not found" });
            }
        }
        else{
            return res.status(401).json({ message: "User not verified" });
        }
    }
    catch(err){
        res.json({
            status:"fail",
            message:err.message
        })
    }
}

export async function doctorLogout(req,res){
    try{
        res.cookie("doctorLogin"," ",{maxAge:1})
        res.json({
            status:"success",
            message:"logout sucessfully"
        })
    }
    catch(err){
        res.json({
            status:"fail",
            message:err.message
        })
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

export async function pendingAppointment(req, res) {
    try {
        let did = req.id
        let appointment = await appointmentModel.find()
        appointment.filter(x =>{
            return (x.doctor == did && x.status == "pending")
        })

      let patient = appointment
        

       patient =  patient.filter((x)=>{
            return (x.status ==="pending")
        })
  
        if (patient) {
            res.json({
                data: patient,
                status: 'success',
            });
        } else {
            res.json({
                message: 'no pending patient',
            });
        }
    } catch (err) {
        res.json({
            status: 'fail',
            message: err.message,
        });
    }
};


