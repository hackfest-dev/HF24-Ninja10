import mongoose from 'mongoose';

const { Schema } = mongoose;

// appointment schema
const appointmentSchema = new Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Patient ID is required'],
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'doctors',
        required: [true, 'Doctor ID is required'],
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'completed'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    setDate: {
        type: Date,
        required: [true, 'Set date is required'],
    },
    reviewNotes: {
        type: String,
        default: '',
    }
});

// Pre-save hook to update createdAt field
appointmentSchema.pre('save', function (next) {
    if (!this.isNew) {
        // Only update createdAt if the document is new
        return next();
    }
    this.createdAt = new Date();
    next();
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
