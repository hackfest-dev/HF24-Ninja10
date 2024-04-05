import doctorModel from "../models/doctorModel"
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