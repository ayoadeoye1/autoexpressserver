import DealerDB from '../models/dealer.model.js'
import JWT from '../secuirity/jwt.js';
import PasswordHash from '../secuirity/passwordHash.js';


export const DealerLogin = async(req, res) =>{
    const { email, password} = req.body;

    if( !email || !password ){
        res.status(400).json('all parameters are required!')
    }

    try {
        const user = await DealerDB.findOne({email: email})
        const isMatch = await PasswordHash.compareP(password, user.password);

        if(!isMatch){
            return res.status(400).json('invalid password!');
        }

        const token = await JWT.generateToken(user._id);
        console.log(token)
        res.status(201).json({token: token});
    } catch (error) {
        res.status(400).json(error.message);
    }

}