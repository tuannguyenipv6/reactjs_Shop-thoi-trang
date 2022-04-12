import mongoose from 'mongoose';
const Schema = mongoose.Schema;

interface IAutoIncrement {
    nameDB: string;
    autoIncrement: number;
}

const AutoIncrementSchema = new Schema<IAutoIncrement>({
    nameDB: {
        required: true,
        unique: true,
        type: String
    },
    autoIncrement: {
        required: true,
        type: Number
    }
});

export interface AutoIncrementDocument extends IAutoIncrement, mongoose.Document {};
const AutoIncrementModel: mongoose.Model<AutoIncrementDocument> = mongoose.model<AutoIncrementDocument>('autoIncrement', AutoIncrementSchema);
export default AutoIncrementModel;