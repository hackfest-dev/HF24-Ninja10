import doctorModel from "../models/doctorModel"
import appointmentModel from "../models/appointmentModel"

const getAllDoctor = async function(req,res){
    try{
        let doctors = await doctorModel.find()
        if(!doctors){

        }
        else{
            res.json({
                data:doctors,
                status:"succesfull"
            })
        }
    }
    catch(err){
        res.json({
            status:fail,
            message:err.message
        })
    }
}

const getDoctor = async function(req,res){
    try{
        let did = req.params.id;
        let details = await doctorModel.findById(did)

        if(details){
            res.json({
                data:details,
                status:"success"
            })
        }
        else{
            res.json({
                status:"fail"
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

const checkPatientAppointment = async function(req,res){
    try{
        let pid = req.params.id
        let patient = await appointmentModel.find({patient:pid})
        if(patient){
            res.json({
                data:patient,
                status:"success"
            })
        }
        else{
            res.json({
                message:"no appointment exist"
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