import mongoose from "mongoose";

const motorcycleSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    madeBy:{
        type: String,
        require: true
    },
    model:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
    status:{
        type: String, // sold/avail
        require: true
    },
    milage:{
        type: Number, // km/s
        require: true
    },
    state:{
        type: String, // new/used
        require: true
    },
    year:{
        type: Number,
        require: true
    },
    addedBy:{
        type: String,
        require: true
    },
    imageUrl:{
        type: String,
        require: true
    },
    imageName:{
        type: String,
        require: true
    },
    dateAdded:{ 
        type: Date,
        default: new Date()
    }
})

export default mongoose.model('MotorcycleDB', motorcycleSchema);