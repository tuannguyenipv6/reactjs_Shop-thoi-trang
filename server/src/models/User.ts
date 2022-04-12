import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface IUser {
    name: string;
    email: string;
    password: string;
    img?: string;
    createdAt?: Date;
    admin?: boolean;
}

const UserSchema = new Schema<IUser>({
    email: {
        type: 'string', // kiểu string
        required: true, // bắt buộc
        unique: true,   // các email không giống nhau
    },
    name: {
        type: 'string', //kiểu string
    },
    password: {
        type: 'string',
        required: true,
    },
    img: {
        type: 'string',
    },
    createdAt: {
        type: Date, // Kiểu date (thời gian)
        default: Date.now(), // khởi tạo
    },
    admin: {
        type: 'boolean',
    }
});

export interface UserDocument extends IUser,mongoose.Document {};

const UserModel: mongoose.Model<UserDocument> = mongoose.model<UserDocument>('users', UserSchema); 
export default UserModel;
// export default mongoose.model('users', UserSchema); 