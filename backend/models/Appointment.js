import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    patient:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    date: {
        type: Date,
        required: true
    },
    hour:{
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    description:{
        type: String
    }
    
},{
    timestamps: true
}
)
const Appointment= mongoose.model('Appointment',appointmentSchema);
export default Appointment;