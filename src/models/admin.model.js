import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    phoneContact:{
        type: Number,
        require: true
    },
    dateAdded:{ 
        type: Date,
        default: new Date()
    }
})

export default mongoose.model('AdminDB', adminSchema);