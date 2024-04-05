import mongoose from 'mongoose';

// appointment
const appointmentSchema = mongoose.Schema({
    patientId: {
        type: String,
        required: [true, 'issuer required'],
    },
    title: {
        type: String,
        required: [true, 'title is required'],
    },
    description: {
        type: String,
        required: [true, 'please provide desciption'],
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'completed'],
    },
    cratedAt: Date,
    reviewNotes: String,
    reviewDate: Date,
});

appointmentSchema.pre('save', async function (next) {
    this.cratedAt = Date.now();
    this.reviewDate = undefined;
    this.reviewNotes = undefined;

    next();
});

const Appointment = mongoose.model('appointment', appointmentSchema);

export default Appointment;
