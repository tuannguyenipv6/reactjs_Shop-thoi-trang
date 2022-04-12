import express from "express";
import DatabaseCommon, {DataCommonDocument, IObj} from "../models/DatabaseCommon";
import AutoIncrementModel, {AutoIncrementDocument} from "../models/AutoIncrement";
import verifyAuth from "../middleware/admin";
import { HydratedDocument } from "mongoose";

interface INews {
    title: string;
    img: string;
    description: string;
    _id?: number;
}

const router = express.Router();

// THỬ NHIỆM THÊM MỚI 
/** 
 * @route POST api/database-common
 * @desc Add new database common
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
        const {key, values, suportKey} = req.body;

        if(!key || !values) {
            return res
                .status(400)
                .json({
                    success: false, 
                    message: `Missing ${!key ? 'key' : 'values'}?`
                })
            ;
        }

        const databaseCommon = await DatabaseCommon.findOne({key});
        if(databaseCommon) {
            return res
                .status(400)
                .json({
                    success: false, 
                    message: 'Key already taken'
                })
            ; 
        }


        // // auto increament
        const autoIncrement = await AutoIncrementModel.findOne({ nameDB: 'DatabaseCommon'});

        if(!autoIncrement) {
            // length DatabaseCommon
            const allDatabaseCommon = await DatabaseCommon.find();

            const newAutoIncrement: HydratedDocument<AutoIncrementDocument> = new AutoIncrementModel({
                nameDB: 'DatabaseCommon',
                autoIncrement: allDatabaseCommon.length === 0 ? 0 : allDatabaseCommon[allDatabaseCommon.length - 1]._id + 1
            })

            await newAutoIncrement.save();
            
            const dataCommon = await newDataCommon(newAutoIncrement.autoIncrement, key, values, suportKey, newAutoIncrement);
            
            return res.status(200).json({
                success: true,
                message: 'New common data successfuly!',
                dataCommon
            })
        }

        const dataCommon = await newDataCommon(autoIncrement.autoIncrement, key, values, suportKey, autoIncrement);

        return res.status(200).json({
            success: true,
            message: 'New common data successfuly!',
            dataCommon
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
 * @route GET api/database-common
 * @desc Get INFOSHOP
 * @access Public
 */
router.get('/', async (_req, res) => {
    try {
        const data = await DatabaseCommon.findOne({key: 'InfoShop'});
        if(!data) {
            return res.status(400).json({
                success: false,
                message: 'Can not find info shop!',
            }) 
        }

        const infoShop = data.values.reduce((accumulator, item) => {
            return {
                ...accumulator,
                [item.key]: item.value,
            }
        }, {})

        return res.status(200).json({
            success: true,
            message: 'New common data successfuly!',
            infoShop
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
 * @route GET api/database-common/news
 * @desc Get News
 * @access Public
 */
 router.get('/news', async (_req, res) => {
    try {
        const data = await DatabaseCommon.find({suportKey: 'All-News'});
        if(!data) {
            return res.status(400).json({
                success: false,
                message: 'Can not find news!',
            }) 
        }

        const dataNews = data.reduce((acc: INews[], item) => {
            const newsDefault: INews = {
                title: '',
                img: '',
                description: '',
            }
            let news = item.values.reduce((acc: INews, itemNews, index) => {
                if(index === 0) {
                    return {
                        ...acc,
                        title: itemNews.value
                    }
                }
                if(itemNews.keyImg) {
                    return {
                        ...acc,
                        img: itemNews.key,
                        description: `${acc.description.length > 30 ? acc.description : `${acc.description} ${itemNews.value}`}`
                    }
                }
                return {
                    ...acc,
                    description: `${acc.description.length > 30 ? acc.description : `${acc.description} ${itemNews.value}`}`
                }
            }, newsDefault)

            if(!news.img) {
                item.values.forEach((currentValue, index) => {
                    if(index !== 0 && !news.img && currentValue.key !== 'Not-Found') {
                        news.img = currentValue.key;
                    }
                })
            }

            news = {
                ...news,
                _id: item._id
            }

            return [
                ...acc,
                news
            ]
        }, [])

        return res.status(200).json({
            success: true,
            message: 'New common data successfuly!',
            data: dataNews.reverse(),
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
 * @route GET api/database-common/info-shop/[id]
 * @desc Get INFOSHOP
 * @access Public
 */
router.get('/info-shop/:key', async (req, res) => {
    try {
        const data = await DatabaseCommon.findOne({key: 'InfoShop'});
        if(!data) {
            return res.status(400).json({
                success: false,
                message: 'Can not find info shop!',
            }) 
        }

        const infoShop = data.values.find((value) => value.key === req.params.key)
        if(!infoShop) {
            return res.status(400).json({
                success: false,
                message: 'Can not find key?',
            }) 
        }

        return res.status(200).json({
            success: true,
            message: 'New common data successfuly!',
            infoShop: infoShop
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
 * @route GET api/database-common/introduce
 * @desc Get Introduce
 * @access Public
 */
router.get('/introduce', async (_req, res) => {
    try {
        const data = await DatabaseCommon.findOne({key: 'Introduce'});
        if(!data) {
            return res.status(400).json({
                success: false,
                message: 'Can not find info shop!',
            }) 
        }
        
        return res.status(200).json({
            success: true,
            message: 'New common data successfuly!',
            introduceShop: data
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
 * @route GET api/database-common/introduce
 * @desc Get Introduce
 * @access Public
 */
router.get('/policy/:key', async (req, res) => {
    try {
        const {key} = req.params;

        const data = await DatabaseCommon.findOne({key});
        if(!data) {
            return res.status(400).json({
                success: false,
                message: 'Can not find key database!',
            }) 
        }
        
        return res.status(200).json({
            success: true,
            message: 'Get policy successfuly!',
            data
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
 * @route GET api/database-common/news/[id]
 * @desc Get news by id
 * @access Public
 */
 router.get('/news/:id', async (req, res) => {
    try {
        const data = await DatabaseCommon.findById(req.params.id);
        if(!data) {
            return res.status(400).json({
                success: false,
                message: 'Can not find by id!',
            }) 
        }

        return res.status(200).json({
            success: true,
            message: 'New common data successfuly!',
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
 * @route GET api/database-common/transport-fee
 * @desc Get TransportFee
 * @access Private
 */
router.get('/transport-fee', verifyAuth, async (_req, res) => {
    try {
        const data = await AutoIncrementModel.findOne({nameDB: "TransportFee"});
        if(!data) {
            return res.status(400).json({
                success: false,
                message: 'Can not find Transport Fee!',
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Transport Fee!',
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

export default router;

/** 
 * @function add new Database Common
 */
const newDataCommon = async (id: number, key: string, values: IObj[], suportKey: string, newAutoIncrement: HydratedDocument<AutoIncrementDocument>) => {
    const dataCommon: HydratedDocument<DataCommonDocument> = new DatabaseCommon({
        _id: id,
        key: `${suportKey ? `${key}-${id}` : key}`,
        values,
        suportKey
    });
    await dataCommon.save();

    newAutoIncrement.autoIncrement = newAutoIncrement.autoIncrement + 1;
    await newAutoIncrement.save();

    return dataCommon;
}