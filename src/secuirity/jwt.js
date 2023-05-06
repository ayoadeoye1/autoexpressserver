import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

class JWT {

    static async generateToken(id) {
        const token = jwt.sign({ _id: id}, JWT_SECRET, {expiresIn: '2h'});
        return token;
    }

    async isTokenValid() {
        
    }

    static async getIDfromToken(token) {
        const isValid = jwt.decode(token, JWT_SECRET);

        return isValid._id;
    }
}

export default JWT;