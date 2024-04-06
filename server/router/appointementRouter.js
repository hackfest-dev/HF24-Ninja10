import express from "express"
const router = express.Router()


router.get("/freeApointment",freeModel)

router.get("/paidApointment",paidModel)

router.get("/book",bookAppointment)

export default router