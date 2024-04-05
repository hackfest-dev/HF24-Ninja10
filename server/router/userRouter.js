import express from "express";
import { registerPatient, login,protectRoute,logout, deleteUser,isAuthorized } from "../controller/userController.js";

const router = express.Router();

router.post("/register", registerPatient);
router.post("/login", login);


 router.use(protectRoute);
 router.get("/logout",logout)

 router.use(isAuthorized,["admin"]);

router.delete("/delete",deleteUser)




export default router;
