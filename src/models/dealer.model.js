import mongoose from "mongoose";

const dealerSchema = new mongoose.Schema({
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
    expiryDate:{
        type: Date,
        require: false
    },
    dateAdded:{ 
        type: Date,
        default: new Date()
    }
})

export default mongoose.model('DealerDB', dealerSchema);