import MotorcycleDB from '../models/motorcycle.model.js';

export const postMcycle = async(req, res) =>{
    const { name, madeBy, model, price, status, mileage, state, year } = req.body;
    const addedBy = 'jj'//req.user.username;
    const image = '6797908'//req.files[0];

    if(!name || !madeBy || !model || !status || !mileage || !state || !year || !addedBy || !image){
        res.status(400).json('one or more parameter(s) are missing!');
    }
    try {
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
            imageUrl: image
        })
    
        await newMcycle.save();
        console.log(newMcycle)
        res.status(201).json('motorcycle instance added successfully!');
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message);
    }
}

export const patchMcycle = async(req, res) =>{
    const { name, madeBy, model, price, status, mileage, state, year } = req.body;
    const addedBy = 'jj'//req.user.username;
    const image = '6797908'//req.files[0];

    const id = req.params.id;
    try {
        let prevData = await MotorcycleDB.findById({_id: id});

        prevData.name = name;
        prevData.madeBy = madeBy;
        prevData.model = model;
        prevData.price = price;
        prevData.status = status;
        prevData.milage = mileage;
        prevData.state = state;
        prevData.year = year;
        prevData.addedBy = addedBy;
        prevData.imageUrl = image;
        
        await prevData.save();
        
        res.status(201).json('motorcycle instance updated successfully!');
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message);
    }
}

export const deleteMcycle = async(req, res) =>{

    const id = req.params.id
    try {
        await MotorcycleDB.deleteOne({_id: id});
        
        res.status(201).json('vehicle instance deleted successfully!');
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message);
    }
}

export const getMcycle = async(req, res) =>{

    try {
        let getData = await MotorcycleDB.find().sort((a, b) => a-b);
        
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

