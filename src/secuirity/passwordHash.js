import bcrypt from 'bcryptjs';

class PasswordHash {

    static async hashP(password) {
        const hp = await bcrypt.hash(password, 20);
        return hp;
    }

    static async compareP(password, hashPassword) {
        const pMatch = await bcrypt.compare(password, hashPassword);
        return pMatch;
    }

}

export default PasswordHash;