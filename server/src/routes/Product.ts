import express from "express";
import Product, { IProduct, ProductDocument } from "../models/Product";
import verifyAuth from "../middleware/admin";
import AutoIncrementModel, { AutoIncrementDocument } from "../models/AutoIncrement";
import { HydratedDocument } from "mongoose";
import { removeVietnameseTones } from "../constant";

const router = express.Router();

/** 
 * @route POST api/product
 * @desc Add new product
 * @access Private
 */
router.post('/', verifyAuth, async (req, res) => {
    try {
        // Nếu ko có quyền admin
        if(!req.userAdmin) {
            return res.status(403).json({
                success: false,
                message: 'Insufficient authority!',
            }) 
        }

        // OK thì lấy data và thêm mới
        const {
            name, description, trademark, productType, originalPrice, price, discount,
            sizes, nameImgs, hotProducts
        } = req.body;

        if(
            !name || !description || !trademark || !productType || !originalPrice || !price ||
             !sizes || sizes.length === 0 || !nameImgs || nameImgs.length === 0) {
            return res
                .status(400)
                .json({
                    success: false, 
                    message: `Missing the value: ${!name ? 'name, ' : ''}${!description ? 'description, ' : ''}${!trademark ? 'trademark, ' : ''}${!productType ? 'productType, ' : ''}${!originalPrice ? 'originalPrice, ' : ''}${!price ? 'price, ' : ''}${!sizes || sizes.length === 0 ? 'sizes, ' : ''}${!nameImgs || nameImgs.length === 0 ? 'nameImgs' : ''}`
                })
            ;
        }
 
        // auto increament
        const autoIncrement = await AutoIncrementModel.findOne({ nameDB: 'Product' });

        if(!autoIncrement) {
            // length DatabaseCommon
            const allProduct = await Product.find();

            const newAutoIncrement: HydratedDocument<AutoIncrementDocument> = new AutoIncrementModel({
                nameDB: 'Product',
                autoIncrement: allProduct.length === 0 ? 0 : allProduct[allProduct.length - 1]._id + 1
            })

            await newAutoIncrement.save();

            const product: IProduct= {
                _id: newAutoIncrement.autoIncrement,
                name: name.toLocaleUpperCase(),
                description, 
                trademark: trademark.toLocaleUpperCase(),
                productType, 
                originalPrice, 
                price, 
                discount,
                sizes, 
                nameImgs,
                hotProducts,
                purchases: 0,
                likes: []
            }
            
            const dataProduct = await newProduct(product, newAutoIncrement);
            
            return res.status(200).json({
                success: true,
                message: 'Add new Product successfuly!',
                data: dataProduct
            })
        }

        const product: IProduct= {
            _id: autoIncrement.autoIncrement,
            name: name.toLocaleUpperCase(), 
            description, 
            trademark: trademark.toLocaleUpperCase(),
            productType, 
            originalPrice, 
            price, 
            discount,
            sizes, 
            nameImgs,
            hotProducts,
            purchases: 0,
            likes: []
        }
        const dataProduct = await newProduct(product, autoIncrement);

        return res.status(200).json({
            success: true,
            message: 'Add new Product successfuly!',
            data: dataProduct
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
});

/** 
 * @route GET api/product
 * @desc GET product popular
 * @access Public
 */
router.get('/popular', async (_req, res) => {
    try {
        const data = await Product.find();
        const popularProducts =  data.sort((a, b) => {
            return b.purchases - a.purchases;
        })

        return res.status(200).json({
            success: true,
            message: 'Get all data successfuly!',
            data: popularProducts
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
});

/** 
 * @route GET api/product
 * @desc GET product
 * @access Public
 */
router.get('/', async (_req, res) => {
    try {
        const data = await Product.find();

        return res.status(200).json({
            success: true,
            message: 'Get all data successfuly!',
            data: data.reverse(),
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
});

/** 
 * @route GET api/product/hot-product
 * @desc GET product hot
 * @access Public
 */
router.get('/hot-product', async (_req, res) => {
    try {
        const data = await Product.find({hotProducts: true});

        return res.status(200).json({
            success: true,
            message: 'Get all data successfuly!',
            data: data.reverse(),
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
});

/** 
 * @route GET api/product/suggested
 * @desc GET product suggested
 * @access Public
 */
router.get('/suggested', async (_req, res) => {
    try {
        const data = await Product.find();
        const suggested =  data.sort((a, b) => {
            return b.likes.length - a.likes.length;
        })

        return res.status(200).json({
            success: true,
            message: 'Get all data successfuly!',
            data: suggested,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
});

/** 
 * @route GET api/product/by_id/[id]
 * @desc Get news by id
 * @access Public
 */
router.get('/by_id/:id', async (req, res) => {
    try {
        const data = await Product.findById(req.params.id);
        if(!data) {
            return res.status(400).json({
                success: false,
                message: 'Can not find by id!',
            }) 
        }

        return res.status(200).json({
            success: true,
            message: 'successfuly!',
            data: data
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
});

/** 
 * @route GET api/product/up-heart/[id]
 * @desc update heart product in id user from token
 * @access Private
*/
router.get('/up-heart/:id', verifyAuth, async (req, res) => {
    try {
        const id = Number(req.params.id);

        const product = await Product.findById(id);
        const isUserHeart = product?.likes.some(like => like === req.userId);

        if(isUserHeart) {
            await Product.updateOne({'_id': id},
                {
                    $pull: {
                        likes: req.userId
                    }
                }
            )
            
            return res.status(200).json({
                success: true,
                message: 'delete user Id heart product successfuly!',
                delete: true, // xóa id user = delete true, thêm id user = delete false
            })
        }else {
            product?.likes.push(req.userId);
            product?.save();

            return res.status(200).json({
                success: true,
                message: 'add id user in like product successfuly!',
                delete: false,
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
});

/** 
 * @route POST api/product/type-product/[type]
 * @desc post product to type
 * @access Public
*/
router.get('/type-product/:type', async (req, res) => {
    try {
        const type: any = req.params.type;
        
        const product = await Product.find({productType: type});

        return res.status(200).json({
            success: true,
            message: 'get product to type successfuly!',
            data: product
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
});

/** 
 * @route POST api/product/search
 * @desc post product to type
 * @access Public
*/
router.post('/search', async (req, res) => {
    try {
        const { valueSearch } = req.body;
        
        const products = await Product.find();

        const searchProduct = products.filter(product => {
            // value Search
            const searchs = `${valueSearch.split(" ")}`;
            const search = removeVietnameseTones(searchs.replace(/,/g, "").toLocaleLowerCase());
            
            // name
            const names = `${product.name.split(" ")}`;
            const name = removeVietnameseTones(names.replace(/,/g, "").toLocaleLowerCase());

            // description
            const descriptions = product.description.description ? `${product.description.description.split(" ")}` : '';
            const description = removeVietnameseTones(descriptions.replace(/,/g, "").toLocaleLowerCase());

            // parameter
            const strParameters = product.description.parameter ? `${product.description.parameter}` : '';
            const parameters = `${strParameters.split(" ")}`
            const parameter = removeVietnameseTones(parameters.replace(/,/g, "").toLocaleLowerCase());

            return name.includes(search) || description.includes(search) || parameter.includes(search);
        })

        return res.status(200).json({
            success: true,
            message: `data search: ${valueSearch}!`,
            data: searchProduct
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
});

/** 
 * @route GET api/product/likes
 * @desc get product user like
 * @access Private
*/
router.get('/likes', verifyAuth, async (req, res) => {
    try {
        const {userId} = req;

        const product = await Product.find({likes: userId});
        
        return res.status(200).json({
            success: true,
            message: 'get product user likes successfully!',
            data: product
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
});

/** 
 * @route GET api/product/cart/add/[id]
 * @desc add product cart user
 * @access Private
*/
router.post('/cart/add/:id', verifyAuth, async (req, res) => {
    try {
        const id = Number(req.params.id);
        const {size} = req.body;
        if(!size) {
            return res.status(400).json({
                success: false,
                message: 'Missing the size',
            })
        }

        const product = await Product.findById(id);
        const isUserCart = product?.cart?.some(like => like.idUser === req.userId);

        if(isUserCart) {
            return res.status(200).json({
                success: true,
                message: 'Already exists in cart? (sản phẩm đã tồn tại trong giỏ hàng?)',
            })
        }else {
            product?.cart?.push({
                idUser: req.userId,
                size,
            });
            product?.save();

            return res.status(200).json({
                success: true,
                message: 'Add cart successfully! (thêm vào giỏ hàng thành công!)',
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
});
/** 
 * @route GET api/product/cart/delete/[id]
 * @desc delete product cart user
 * @access Private
*/
router.get('/cart/delete/:id', verifyAuth, async (req, res) => {
    try {
        const id = Number(req.params.id);

        const product = await Product.findById(id);
        const isUserCart = product?.cart?.some(like => like.idUser === req.userId);

        if(isUserCart) {
            await Product.updateOne({'_id': id},
                {
                    $pull: {
                        "cart": {
                            "idUser": req.userId
                        }
                    }
                }
            )
            
            return res.status(200).json({
                success: true,
                message: 'Product removed from cart successfully! (Đã xóa sản phẩm khỏi giỏ hàng!)',
            })
        }else {
            return res.status(200).json({
                success: true,
                message: 'The product is not in the cart! (không tìm thấy sản phẩm trong giỏ hàng!)',
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
});

/** 
 * @route GET api/product/cart
 * @desc get product user like
 * @access Private
*/
router.get('/cart', verifyAuth, async (req, res) => {
    try {
        const {userId} = req;

        const product = await Product.find({"cart.idUser": userId});
        
        return res.status(200).json({
            success: true,
            message: 'get cart successfully!',
            data: product
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
});

export default router;

/** 
 * @function add new Product
 */
const newProduct = async (product: IProduct, newAutoIncrement: HydratedDocument<AutoIncrementDocument>)=> {
    const dataProduct: HydratedDocument<ProductDocument> = new Product(product);
    await dataProduct.save();

    newAutoIncrement.autoIncrement = newAutoIncrement.autoIncrement + 1;
    await newAutoIncrement.save();

    return dataProduct;
}
