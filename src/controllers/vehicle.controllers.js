import VehicleDB from '../models/vehicle.model.js';

export const postVehicle = async(req, res) =>{
    const { name, madeBy, model, price, status, mileage, transmission, drivetrain, state, year } = req.body;
    const addedBy = 'jj'//req.user.username;
    const image = '6797908'//req.files[0];

    if(!name || !madeBy || !model || !status || !mileage || !transmission || !drivetrain || !state || !year || !addedBy || !image){
        res.status(400).json('one or more parameter(s) are missing!');
    }
    try {
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
            imageUrl: image
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
    const image = req.files[0];

    try {
        let prevData = await VehicleDB.findOne({_id: req.params.id});

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
        prevData.imageUrl = image;
        
        await prevData.save();
        res.status(201).json('vehicle instance updated successfully!');
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message);
    }
}

export const deleteVehicle = async(req, res) =>{

    try {
        let deleteData = await VehicleDB.findOne({_id: req.params.id});
        
        await deleteData.remove();
        res.status(201).json('vehicle instance deleted successfully!');
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message);
    }
}

export const getVehicle = async(req, res) =>{

    try {
        let getData = await VehicleDB.find().sort((a, b) => a-b);
        
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

