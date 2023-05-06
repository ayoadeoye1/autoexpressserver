import JWT from "../secuirity/jwt.js";
import DealerDB from '../models/admin.model.js'


export const ValidateDealer = async(req, res, next) =>{
    const { authorization } = req.header;

    if(!authorization){
        res.status(400).json('user not logged in')
    }

    const token = authorization.replace('Bearer ', "");

    try {
        const id = await JWT.getIDfromToken(token);
        const dbUser = await DealerDB.findById(id);
        req.dbUser = dbUser;
        next();
    } catch (error) {
        res.status(400).json(error.message);
    }
}