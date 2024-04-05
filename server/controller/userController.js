import userModel from "../models/userSchema.js";
import jwt from "jsonwebtoken"

const registerPatient = async function(req, res) {
    const { name, email, phone, password, gender, dob, role } = req.body;

    if (!name  || !email || !phone || !password || !gender || !dob || !role) {
        return res.status(400).json({
            message: "Please fill all the details"
        });
    }

    try {
        await userModel.create({ name, email, phone, password, gender, dob, role });
        res.json({
            data: req.body,
            message: "User signed up successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const login = async function(req, res) {
    try {
        let { email, password, role } = req.body;
        email = email.toLowerCase();

        console.log(req.body);
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Please fill all the details"
            });
        }

        const user = await userModel.findOne({ email }).select('+password');

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        
        const isPasswordValid = await user.comparePassword(password);
      

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Incorrect email or password"
            });
        }

        if (role !== user.role) {
            return res.status(403).json({
                message: "User with this role is not authorized"
            });
        }

        let token = user.generateJsonWebToken(); 
        res.cookie('login', token, { httpOnly: true });
       let ck =  req.cookies.login
       console.log(ck)
        

        res.json({
            status : `${user.name} logged in succesfully`,
            
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const protectRoute = async function(req, res, next) {
    try {
        const token = req.cookies.login;

        if (!token) {
            return res.status(401).json({
                message: "Token not found, authorization denied"
            });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!payload) {
            return res.status(401).json({
                message: "Invalid token, authorization denied"
            });
        }

        const user = await userModel.findById(payload.id);

        if (!user) {
            return res.status(401).json({
                message: "User not found, authorization denied"
            });
        }

        req.user = user; 
        next();
    } catch (err) {
        res.status(401).json({
            message: "Invalid token, authorization denied"
        });
    }
}

const logout = async function(req,res){
    try{
        res.cookie('login',' ',{maxAge:1})
        res.json({
            message:"user logged out succesfully"
        })
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}

const isAuthorized = async function(roles){
    return function(req,res,next){
        if(roles.includer(req.role)){
            next()
        }
        else{
            res.json({
                message:"Unauthorized"
            })
        }
    }
    
}

const deleteUser = async function(req,res,next){
    try{
        let uid = req.params.id
        let user = await userModel.findByIdAndDelete(uid)
        if(!user){
            res.json({
                message:"no such user exist"
            })
        }
        else{
            res.json({
                data:user,
                message:"user deleted sucessfully"
            })
        }
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}
export  { registerPatient, login, protectRoute, logout, deleteUser };

