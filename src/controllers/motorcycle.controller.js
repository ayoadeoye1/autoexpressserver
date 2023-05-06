import MotorcycleDB from '../models/motorcycle.model.js';
import cloudinary from '../utils/cloudinary.js';

export const postMcycle = async(req, res) =>{
    const { name, madeBy, model, price, status, mileage, state, year } = req.body;
    const addedBy = req.dbUser.username;
    const image = req.file?.path;
    console.log(image, req.file)

    if(!name || !madeBy || !model || !status || !mileage || !state || !year || !addedBy){
        res.status(400).json('one or more parameter(s) are missing!');
    }

    try {
        const imageName = await req.imageName;
        const result = await cloudinary.uploader.upload(image);
        console.log(result);
        const newMcycle = new MotorcycleDB({
            name,
            madeBy,
            model,
            price, 
            status, 
            mileage, 
            state, 
            year,
            addedBy,
            imageName,
            imageUrl: result.public_id
        })
    
        await newMcycle.save();
        
        res.status(201).json(newMcycle);
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message);
    }
}

export const patchMcycle = async(req, res) =>{
    const { name, madeBy, model, price, status, mileage, state, year } = req.body;
    const addedBy = 'jj'//req.dbUser;
    const image = req.file.path;

    try {
        let prevData = await MotorcycleDB.findById({_id: req.params.id});

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

export const deleteMcycle = async(req, res) =>{

    try {
        const del = MotorcycleDB.findById({_id: req.params.id});
        await cloudinary.uploader.destroy(del.imageUrl);
        await MotorcycleDB.deleteOne({_id: req.params.id});
        
        res.status(201).json('motorcycle instance deleted successfully!');
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message);
    }
}

export const getMcycle = async(req, res) =>{

    try {
        let getData = await MotorcycleDB.find().sort();
        
        res.status(201).json(getData);
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message);
    }
}

// reminant, display under every products, content added by same user

export const getMcycleByDealer = async(req, res) =>{

    try {
        let getData = await MotorcycleDB.findOne({addedBy: req.user});
        
        res.status(201).json(getData);
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message);
    }
}

