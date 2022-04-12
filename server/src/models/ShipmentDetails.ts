import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface IShipmentDetails {
    address: string
    fullName: string
    phoneNumber: string
    _id: string | any;
}

const ShipmentDetailsSchema = new Schema<IShipmentDetails>({
    address: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    _id: Schema.Types.ObjectId
});

export interface ShipmentDetailsDocument extends IShipmentDetails, mongoose.Document {
    _id: string | any;
}

const ShipmentDetails: mongoose.Model<ShipmentDetailsDocument> 
    = mongoose.model<ShipmentDetailsDocument>('ShipmentDetails', ShipmentDetailsSchema);
export default ShipmentDetails;