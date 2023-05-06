import VehicleDB from '../models/vehicle.model.js';
import cloudinary from '../utils/cloudinary.js';

export const postVehicle = async(req, res) =>{
    const { name, madeBy, model, price, status, mileage, transmission, drivetrain, state, year } = req.body;
    const addedBy = req.dbUser.username;
    const image = req.file.path;

    if(!name || !madeBy || !model || !status || !mileage || !transmission || !drivetrain || !state || !year || !addedBy || !image){
        res.status(400).json('one or more parameter(s) are missing!');
    }

    try {
        const imageName = await req.imageName;
        const result = await cloudinary.uploader.upload(image);
        console.log(result);
        const newVehicle = new VehicleDB({
            name, 
            madeBy, 
            model, 
            price, 
            status, 
            mileage, 
            transmission, 
            drivetrain, 
            state, 
            year,
            addedBy,
            imageName,
            imageUrl: result.public_id
        })
    
        await newVehicle.save();
        res.status(201).json('vehicle instance added successfully!');
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message);
    }
}

export const patchVehicle = async(req, res) =>{
    const { name, madeBy, model, price, status, mileage, transmission, drivetrain, state, year } = req.body;
    const addedBy = req.user.username;
    const image = req.file.path;

    try {

        let prevData = await VehicleDB.findOne({_id: req.params.id});

        let result;
        if(req.file){
            await cloudinary.uploader.destroy(prevData.imageUrl);
            result = await cloudinary.uploader.upload(image);
        }

        const imageName = await req.imageName;
        
        prevData.name = name;
        prevData.madeBy = madeBy;
        prevData.model = model;
        prevData.price = price;
        prevData.status = status;
        prevData.milage = mileage;
        prevData.transmission = transmission;
        prevData.drivetrain = drivetrain;
        prevData.state = state;
        prevData.year = year;
        prevData.addedBy = addedBy;
        prevData.imageName = imageName;
        prevData.imageUrl = result.public_id;
        
        await prevData.save();
        res.status(201).json(prevData);
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message);
    }
}

export const deleteVehicle = async(req, res) =>{

    try {
        const del = VehicleDB.findById({_id: req.params.id});
        await cloudinary.uploader.destroy(del.imageUrl);
        await VehicleDB.deleteOne({_id: req.params.id});
        
        res.status(201).json('vehicle instance deleted successfully!');
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message);
    }
}

export const getVehicle = async(req, res) =>{

    try {
        let getData = await VehicleDB.find().sort();
        
        res.status(201).json(getData);
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message);
    }
}

// reminant, display under every products, content added by same user

export const getVehicleByDealer = async(req, res) =>{

    try {
        let getData = await VehicleDB.findOne({addedBy: req.user});
        
        res.status(201).json(getData);
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message);
    }
}

