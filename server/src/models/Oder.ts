import mongoose from 'mongoose';
import { TODAY } from '../constant';
const Schema = mongoose.Schema;

export interface IProductsOder {
    idProduct: number;
    img: string;
    name: string;
    size: string;
    price: number;
    amount: number
}

const ProductsOderSchema = new Schema<IProductsOder>({
    idProduct: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
});

interface IOder {
    _id: number;
    idUser: string;
    name: string;
    address: string;
    phoneNumber: string;
    transportFee: number;
    productOder: IProductsOder[];
    day: string;
    status: 'READY' | 'IN_PROGRESS' | 'COMPLETED' | "SEND_REQUIRE" | "CANCELLED";
    isDeleted: boolean;
    // READY         : đơn hàng mới
    // IN_PROGRESS   : đang gửi shipper
    // COMPLETED     : đơn hàng đã giao thành công
    // SEND_REQUIRE  : yêu cầu hủy đơn hàng
    // CANCELLED     : đơn hàng đã hủy
}

const OderSchema = new Schema<IOder>({
    _id: Number,
    idUser: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    transportFee: {
        type: Number,
        required: true
    },
    productOder: {
        type: [ProductsOderSchema],
        required: true
    },
    day: {
        type: String,
        required: true,
        default: TODAY()
    },
    status: {
        type: String,
        required: true,
        enum: ['READY', 'IN_PROGRESS', 'COMPLETED', "SEND_REQUIRE", "CANCELLED"],
        default: 'READY'
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    }
});

export interface OderDocument extends IOder, mongoose.Document {
    _id: number,
};
const Oder: mongoose.Model<OderDocument> = mongoose.model<OderDocument>('Oder', OderSchema);
export default Oder;
