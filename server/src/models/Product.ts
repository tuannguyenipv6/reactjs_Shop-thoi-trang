import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Mô tả
interface IDescriptionProduct {
    description?: string;
    parameter?: string[]
}

// Size
interface ISizes {
    size: string;
    status: number;
}

// Đánh giá
interface IEvaluate {
    idUser: string | any;
    evaluate: number;
}

interface ICart {
    idUser: string | any;
    size: string;
}

// Sản phẩm
export interface IProduct  {
    _id: number;
    name: string;
    description: IDescriptionProduct; // Mô tả
    trademark: string;                // Nhãn hiệu
    productType: 'CLOTHES' | 'FOOTWEAR' | 'ACCESSORY' | 'OTHER'; // Loại sản phẩm [quần áo, giày dép, phụ kiện, khác]
    originalPrice: number;            // Giá gốc
    price: number;                    // Giá bán
    discount: number;                 // Khuyến mãi [%]
    sizes: ISizes[];                  // sizes { size, trạng thái (còn bao nhiêu hàng hay hết) }
    nameImgs: string[];               // Tên các ảnh sản phẩm
    hotProducts?: boolean;            // sản phẩm hot 
    purchases: number;                // Số lượt mua
    likes: string[];                  // Số lượt thích
    evaluates?: IEvaluate[];          // Đánh giá [idUser, đánh giá (vd: 20 = 20% = 1*)]
    cart?: ICart[];                   // Giỏ hàng
}

// Mô tả
const DescriptionSchema = new Schema<IDescriptionProduct>({
    description: {
        type: String,
    },
    parameter: {
        type: [String],
    }
})

// Size
const SizesSchema = new Schema<ISizes>({
    size: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true,
    }
});

// Đánh giá
const EvaluatesSchema = new Schema<IEvaluate>({
    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
        unique: true
    },
    evaluate: {
        type: Number,
        required: true
    }
})

const CartSchema = new Schema<ICart>({
    idUser: {
        type: String,
        ref: 'users',
        required: true,
        unique: true
    },
    size: {
        type: String,
        required: true
    }
})

const ProductSchema = new Schema<IProduct>({
    _id: Number,
    name: {
        type: String,
        required: true,
    },
    description: {
        type: DescriptionSchema,
        required: true,
    },
    trademark: {
        type: String,
        required: true,
    },
    productType: {
        type: String,
        enum: ['CLOTHES', 'FOOTWEAR', 'ACCESSORY', 'OTHER']
    },
    originalPrice: { 
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
        default: 0,
    },
    sizes: {
        type: [SizesSchema],
        required: true,
    },
    nameImgs: {
        type: [String],
        required: true,
    },
    hotProducts: Boolean,
    purchases: {
        type: Number,
        required: true,
        default: 0,
    },
    likes: {
        type: [String],
        required: true,
        default: [],
    },
    evaluates: {
        type: [EvaluatesSchema],
        required: true,
        default: [],
    },
    cart: {
        type: [CartSchema],
        required: true,
        default: [],
    }
})
 
export interface ProductDocument extends IProduct, mongoose.Document {
    _id: number;
};
const Product: mongoose.Model<ProductDocument> = mongoose.model<ProductDocument>('products', ProductSchema);
export default Product;