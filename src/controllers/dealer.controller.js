import DealerDB from '../models/dealer.model.js';
import PasswordHash from '../secuirity/passwordHash.js';

export const createDealer = async(req, res) =>{
    const { username, email, password, phoneContact, expiryDate } = req.body;

    if( !username || !email || !password || !phoneContact ){
        res.status(400).json('all except expiryDate are required!')
    }

    try {
        const user = await DealerDB.findOne({email: email});
        if(user){
            res.status(400).json('dealer already exist!');
        }
        const hashPassword = await PasswordHash.hashP(password);
        const newUser = new DealerDB({
            username,
            email,
            password: hashPassword,
            phoneContact,
            expiryDate
        })

        await newUser.save();
        res.status(201).json('dealer created successfully');
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message);
    }
}

export const editDealer = async(req, res) =>{
    const { username, email, password, phoneContact, expiryDate } = req.body;

    try {
        const user = await DealerDB.findOne({_id: req.params.id});
        
        const hashPassword = await PasswordHash.hashP(password);

        user.username = username;
        user.email = email;
        user.password = hashPassword;
        user.phoneContact = phoneContact;
        user.expiryDate = expiryDate

        await user.save();
        res.status(201).json('dealer updated successfully');
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message);
    }
}

export const deleteDealer = async(req, res) =>{

    try {
        await DealerDB.deleteOne({_id: req.params.id});

        res.status(201).json('dealer deleted successfully');
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message);
    }
}

export const getDealers = async(req, res) =>{

    try {
        const user = await DealerDB.find().sort();

        res.status(201).json(user);
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message);
    }
}