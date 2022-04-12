import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface IComment {
    name: string;
    avatar: string;
    date: string;
    content: string;
    star: number;
    product: number;
    user: any
}

const CommentSchema = new Schema<IComment>({
    name: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    star: {
        type: Number,
        required: true,
    },
    product: {
        type: Number,
        required: true,
        ref: 'products'
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    }
});

export interface CommentDocument extends IComment,mongoose.Document {};

const CommentModel: mongoose.Model<CommentDocument> = mongoose.model<CommentDocument>('comments', CommentSchema); 
export default CommentModel;