import mongoose from 'mongoose';

const equipmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'an equipement must have a name'],
    },
    doner: {
        type: String,
        required: [true, 'an equipement must have a doner'],
    },
    // catogery : {
    //     type : String,
    //     required : [true, 'an equipement must have a catogery']
    // },
    numberOfImages: {
        type: Number,
        default: 1,
    },
    status: {
        type: String,
        default: 'available', // available | donated
        enum: ['available', 'donated'],
    },
    images: [String],
    createdAt: Date,
});

// run this before saving the document
equipmentSchema.pre('save', async function (next) {
    this.createdAt = Date.now();

    next();
});

const Equipment = mongoose.model('equipements', equipmentSchema);

module.exports = Equipment;
