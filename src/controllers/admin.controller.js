import AdminDB from '../models/admin.model.js';
import PasswordHash from '../secuirity/passwordHash.js';

export const createAdmin = async(req, res) =>{
    const { username, email, password, phoneContact } = req.body;

    if( !username || !email || !password || !phoneContact ){
        res.status(400).json('all parameters are required!')
    }

    try {
        const user = await AdminDB.findOne({email: email});
        if(user){
            res.status(400).json('admin with email already exist!');
        }
        const hashPassword = await PasswordHash.hashP(password);
        const newUser = new AdminDB({
            username,
            email,
            password: hashPassword,
            phoneContact,
        })

        await newUser.save();
        res.status(201).json('new admin created successfully');
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message);
    }
}

export const editAdmin = async(req, res) =>{
    const { username, email, password, phoneContact } = req.body;

    try {
        const user = await AdminDB.findOne({_id: req.params.id});
        
        const hashPassword = await PasswordHash.hashP(password);

        user.username = username;
        user.email = email;
        user.password = hashPassword;
        user.phoneContact = phoneContact;

        await user.save();
        res.status(201).json('admin updated successfully');
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message);
    }
}

export const deleteAdmin = async(req, res) =>{

    try {
        const user = await AdminDB.findOne({_id: req.params.id});

        await user.remove();
        res.status(201).json('dealer deleted successfully');
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message);
    }
}

export const getAdmins = async(req, res) =>{

    try {
        const user = await AdminDB.find().sort((a, b) => a-b);

        res.status(201).json(user);
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message);
    }
}