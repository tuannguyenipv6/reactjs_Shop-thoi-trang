import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface IObj {
    key: string;
    value: string;
    keyImg?: boolean;
}

interface IDatabaseCommon {
    _id: number;
    key: string;
    values: IObj[];
    suportKey: string;
}

const ObjSchema = new Schema<IObj>({key: String, value: String, keyImg: Boolean});

const DatabaseCommonSchema = new Schema<IDatabaseCommon>({
    _id: Number,
    key: {
        type: String,
        required: true,
        unique: true,
    },
    values: {
        type: [ObjSchema],
        required: true,
    },
    suportKey: String,
})
 
export interface DataCommonDocument extends IDatabaseCommon, mongoose.Document {
    _id: number;
};
const DatabaseCommon: mongoose.Model<DataCommonDocument> = mongoose.model<DataCommonDocument>('DatabaseCommon', DatabaseCommonSchema);
export default DatabaseCommon;