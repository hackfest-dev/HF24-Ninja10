import express from "express"
import { createAppointment, deleteAppointment, getAllAppointment, getAppointement, updateAppointment } from "../controller/appointmentController"
const router = express.Router()


router.get("/freeApointment",freeModel)
router.get("/paidApointment",paidModel)



router.route("/")
.post(createAppointment)
.get(getAllAppointment)

router.use(protectRoute)

router.get("/book",bookAppointment)

router.route("/:id")
.get(getAppointement)
.patch(updateAppointment)
.delete(deleteAppointment)

export default router