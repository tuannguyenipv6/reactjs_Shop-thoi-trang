import { IContactOption, IProduct, IProductCart } from "../datatypes";

// export const API = 'http://192.168.43.84:5000';
// export const API = 'http://192.168.0.103:5000';
// export const API = 'http://192.168.0.17:5000';
export const API = 'http://192.168.0.24:5000';
// export const API = 'http://192.168.0.5:5000';

export const MY_MENU = [
    { title: 'Trang Chủ', path: '/' },
    { title: 'Giới Thiệu', path: '/intro' },
    { title: 'Danh Mục', path: '/category' },
    { title: 'Tin Tức', path: '/news' },
    { title: 'Liên Hệ', path: '/contact' },
]

export const CATELOTYCONTEN = [
    {
        key: 'Quần, áo',
        values: [
            'Áo sơ mi',
            'Quần jean',
            'Áo vest',
            'Đồ thể thao',
            'Quần tây',
        ],
        productType: 'CLOTHES'
    },
    {
        key: 'Giày, dép',
        values: [
            'Giày tây',
            'Giày thể thao',
            'Giày đá bóng',
        ],
        productType: 'FOOTWEAR'
    },
    {
        key: 'Phụ kiện',
        values: [
            'Balo',
            'Túi đeo chéo'
        ],
        productType: 'ACCESSORY'
    }
]

// options contact
export const CONTACT_OPTIONS: IContactOption[] = [
    { value: false, label: 'Góp ý' },
    { value: true, label: 'Gửi lên Admin' }
]

// token
export const TOKEN_NAME_LOCAL_STORAGE = 'my-token-shopnqt';

export const FOTMAT_CURRENCY = (money: number) => {
    return money?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export enum PRODUCT_TYPE {
    CLOTHES = "Quần áo",
    FOOTWEAR = "Giày dép",
    ACCESSORY = "Phụ kiện",
    OTHER = "Khác",
    POPULAR = "SẢN PHẨM PHỔ BIẾN",
    "NEW-PRODUCT" = "SẢN PHẨM MỚI",
    "HOT-PRODUCT" = "TOP SẢN PHẨM HOT",
    SUGGESTED = "CÓ THỂ BẠN SẼ THÍCH"
}

export enum PRODUCT_TYPE_INVERSE {
    "Quần áo" = "CLOTHES",
    "Giày dép" = "FOOTWEAR",
    "Phụ kiện" = "ACCESSORY",
    "Khác" = "OTHER",
    "SẢN PHẨM PHỔ BIẾN" = "POPULAR",
    "SẢN PHẨM MỚI" = "NEW-PRODUCT",
    "TOP SẢN PHẨM HOT" = "HOT-PRODUCT",
    "CÓ THỂ BẠN SẼ THÍCH" = "SUGGESTED",
}

// các dạng sản phẩm
export const KEY_PRODUCT = [
    PRODUCT_TYPE['POPULAR'],
    PRODUCT_TYPE['NEW-PRODUCT'],
    PRODUCT_TYPE['HOT-PRODUCT'],
    PRODUCT_TYPE['SUGGESTED'],
]

export const VALUE_RATING = [20, 40, 60, 80, 100]


export const FOTMAT_DAY = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day < 10 ? `0${day}` : day}-${month < 10 ? `0${month}` : month}-${year}`;
}

export interface ITrademarkSize {
    trademarks: string[];
    sizes: string[];
}

export const PRICE_RANGE = [
    {
        title: 'DƯỚI 1,000,000Đ',
        from: 0,
        to: 1000000
    }, {
        title: '1,000,000Đ→2,000,000Đ',
        from: 1000000,
        to: 2000000
    }, {
        title: '2,000,000Đ→3,000,000Đ',
        from: 2000000,
        to: 3000000
    }, {
        title: '3,000,000Đ→4,000,000Đ',
        from: 3000000,
        to: 4000000
    }, {
        title: 'TRÊN 4,000,000Đ',
        from: 3000000,
        to: 999000000
    },
    {
        title: 'TẤT CẢ',
        from: 0,
        to: 999000000
    }
];

export enum ARRANGE_PRODUCT {
    priceAscending = 'Giá: Tăng dần',
    priceDescending = 'Giá: Giảm dần',
    AToZ = 'Tên A->Z',
    ZToA = 'Tên Z->A',
    oldest = 'Củ nhất',
    newest = 'Mới nhất',
    bestProduct = 'Bán chạy nhất'
}

export const FILTER_TRADEMARK_SIZE = (products: IProduct[]): ITrademarkSize=> {
    const result: ITrademarkSize = {
      trademarks: [],
      sizes: []
    }
  
    products.forEach(product => {
      // trademarks
      const trademarkProduct = product.trademark.trim().toLocaleUpperCase()
      const isTrademark = result.trademarks.some(tr => tr.trim().toLocaleUpperCase() === trademarkProduct)
      if(!isTrademark && trademarkProduct !== "KHÔNG") {
        result.trademarks.push(trademarkProduct)
      }
      
      // sizes
      product.sizes.forEach((size) => {
        const sizeProduct = size.size.trim().toLocaleUpperCase();
        const isSize = result.sizes.some(size => size.trim().toLocaleUpperCase() === sizeProduct);
        
        if(!isSize && sizeProduct !== "NOT-FOUND") {
          result.sizes.push(sizeProduct)
        }
      })
    })  
  
    return {
      trademarks: result.trademarks.sort(),
      sizes: result.sizes.sort(),
    };
}

export const removeVietnameseTones = (str: string) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
    str = str.replace(/\u02C6|\u0306|\u031B/g, "");
    str = str.replace(/ + /g,"-");
    str = str.replace(/ /g,"-");
    str = str.trim();
    return str;
}

export const PRODUCT_FILTER_ARRGANGE = (productData: IProduct[], arrange: string): IProduct[] => {
    switch(arrange) {
        case ARRANGE_PRODUCT['priceAscending']: {
            const productAscending =  productData.sort((a, b) => {
                return a.price - b.price;
            })
            return productAscending;
        }
        case ARRANGE_PRODUCT['priceDescending']: {
            const productDescending =  productData.sort((a, b) => {
                return b.price - a.price;
            })
            return productDescending;
        }
        case ARRANGE_PRODUCT['AToZ']: {
            const productAToZ =  productData.sort((a, b) => {
                const fname = removeVietnameseTones(a.name);  
                const sname = removeVietnameseTones(b.name);  
                if (fname === sname) {
                    return 0;
                  }
                  return fname < sname ? -1 : 1;
                    
            })
            return productAToZ;
        }
        case ARRANGE_PRODUCT['ZToA']: {
            const productZToA =  productData.sort((a, b) => {
                const fname = removeVietnameseTones(a.name); 
                const sname = removeVietnameseTones(b.name);  
                if (fname === sname) {
                    return 0;
                }
                  return fname > sname ? -1 : 1;
                    
            })
            return productZToA;
        }
        case ARRANGE_PRODUCT['oldest']: {
            return productData.reverse();
        }
        case ARRANGE_PRODUCT['newest']: {
            return productData;
        }
        case ARRANGE_PRODUCT['bestProduct']: {
            const productBestProduct =  productData.sort((a, b) => {
                return b.purchases - a.purchases;
            })
            return productBestProduct;
        }
        default: return [];
    }
}

export const POLICYS = [
    'Chính-sách-bảo-hành.WarrantyPolicy', // 0
    'Chính-sách-hoàn-trả.ReturnPolicy', // 1
    'Chính-sách-thanh-toán.PaymentPolicy',  // 2
    'Chính-sách-bảo-mật.PrivacyPolicy',  // 3
    'Gói-miễn-phí-vận-chuyển.Freeship',  // 4
    'Thời-gian-hỗ-trợ.Support24h',    //5
]

export interface IShipmentDetails {
    _id?: string | any;
    address: string;
    fullName: string;
    phoneNumber: string;
} 

export const CALCULATE_PRICE = (product: IProductCart) => {
    if(product.discount > 0) {
        return product.price - (product.price / 100 * product.discount)
    }else {
        return product.price
    }
}

export const LINK_PRODUCT = (name: string, id: number): string => {
    return `/${name.replace(/\/?/g, '').replace(/\?/g, '').replace(/ /g, '-')}.${id}`
}