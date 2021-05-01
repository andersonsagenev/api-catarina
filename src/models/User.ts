import { Schema, model , Document} from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUserInterface } from '../interfaces/UserInterface';
import jwt from 'jsonwebtoken';
import authConfig from '../../src/config/auth.json';

interface UserModel extends IUserInterface, Document {}

const UserSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    avatar: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    passwordResetToken: {
        type: String,
        select: false,
    },
    passwordResetExpires: {
        type: Date,
        select: false
    },
},
    { timestamps: true }
);

UserSchema.pre<UserModel>('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});
UserSchema.pre<UserModel>('save', function gerarAvatar() {
    const randomId = Math.floor(Math.random() * (1000000)) + 1;
    this.avatar = `https://api.adorable.io/avatars/285${randomId}.png`;
});

// UserSchema.methods.gerarToken = function(): string {

//     const decodedToken = {
//         _id: String(this._id)
//     };

//     return jwt.sign(decodedToken, authConfig.secret, {
//         expiresIn: '1d'
//     })
// }


export default  model<UserModel>('User', UserSchema);


