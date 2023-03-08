import bcrypt from 'bcryptjs';

class PasswordHash {

    async hashP(password) {
        const hp = await bcrypt.hash(password, 20);
        return hp;
    }

    async compareP(password, hashPassword) {
        const pMatch = await bcrypt.compare(password, hashPassword);
        return pMatch;
    }

}

export default PasswordHash;