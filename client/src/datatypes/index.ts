export interface User {
    _id?: string | any;
    name?: string;
    email: string;
    password?: string;
    img?: string;
    admin?:boolean;
}

// Obj
export interface Obj {
    key: string;
    value: string;
    _id?: string;
}

// data common
export interface IDataCommon {
    _id: number;
    key: string;
    values: Obj[];
    suportKey: string;
}

// info shop
export interface IIntroduce {
    _id: number | any;
    key: string;
    values: Obj[];
}

// type Contact option
export interface IContactOption {
    value: boolean;
    label: 'Góp ý' | 'Gửi lên Admin'
}

export interface ContactInfo {
    name: string;
    email: string;
    phone: string;
    description: string;
}


// News
export interface News {
    title: string;
    img: string;
    description: string;
    _id: number;
}

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
export interface IEvaluate {
    idUser: string | any;
    evaluate: number;
}

interface ICart {
    idUser: string | any;
    size: string;
}

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
    purchases: number;               // Số lượt mua
    likes: string[];                 // Số lượt thích
    evaluates?: IEvaluate[]           // Đánh giá [idUser, đánh giá (vd: 20 = 20% = 1*)]
    cart?: ICart[]; 
}

export interface IComment {
    name: string;
    avatar: string;
    date: string;
    content: string;
    star: number;
    product: number;
    user: any 
}

export interface IProductCart extends IProduct {
    checked: boolean;
    amount: number;
}

export interface IProductsOder {
    idProduct: number;
    img: string;
    name: string;
    size: string;
    price: number;
    amount: number;
}

export const READY = 'READY';               // gửi đơn hàng lên shop
export const IN_PROGRESS = 'IN_PROGRESS';   // đang vận chuyển
export const COMPLETED = 'COMPLETED';       // đã nhận hàng

export const SEND_REQUIRE = 'SEND_REQUIRE'; // đang yêu cầu hủy đơn
export const CANCELLED = 'CANCELLED';       // đã đc shop đồng ý hủy

export interface IOder {
    _id?:number;
    idUser?: string;
    name: string;
    address: string;
    phoneNumber: string;
    transportFee: number;
    productOder: IProductsOder[];
    day?: string;
    status?: 'READY' | 'IN_PROGRESS' | 'COMPLETED' | "SEND_REQUIRE" | "CANCELLED";
}

export interface ISlider {
    _id: string;
    title: string;
    name: string;
    description: string;
    img: string;
    idKey?: number;
    isProduct?: boolean;
}