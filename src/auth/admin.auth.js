import AdminDB from '../models/admin.model.js';
import JWT from '../secuirity/jwt.js';
import PasswordHash from '../secuirity/passwordHash.js';


export const AdminLogin = async(req, res) =>{
    const {username, email, password} = req.body;

    if( !username || !email || !password ){
        res.status(400).json('all parameters are required!')
    }

    try {
        const user = await AdminDB.findOne(email)
        const isMatch = await PasswordHash.compareP(user.password, password);

        if(!isMatch){
            res.status(400).json('invalid password!');
        }

        const token = JWT.generateToken(user._id);
        console.log(token)
        res.status(201).json({token: token});
    } catch (error) {
        res.status(400).json(error.message);
    }

}