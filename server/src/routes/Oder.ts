import express from 'express';
import { HydratedDocument } from 'mongoose';
import AutoIncrementModel from '../models/AutoIncrement';
import verifyAuth from '../middleware/admin';
import Oder, { IProductsOder, OderDocument } from '../models/Oder';
import Product from "../models/Product";

const router = express.Router();

/**
 * @route POST api/oder
 * @desc add new oder
 * @access Privater
 */
router.post('/', verifyAuth, async (req, res) => {
    try {
        const {name, address, phoneNumber, transportFee, productOder} = req.body;
        if(!name || !address || !phoneNumber || !transportFee || !productOder) {
            const message = `missing column: ${!name ? 'name, ' : ''}${!address ? 'address, ' : ''}${!phoneNumber ? 'phoneNumber, ' : ''}${!transportFee ? 'transportFee, ' : ''}${!productOder ? 'productOder, ' : ''}`
            return res.status(400).json({
                success: false,
                message: message.slice(0, -2),
            })
        }

        if(productOder.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'productOder no value!'
            })
        }

        // auto increament
        const autoIncrement = await AutoIncrementModel.findOne({ nameDB: 'Oder' });
        if(!autoIncrement) {
            return res.status(400).json({
                success: false,
                message: 'no auto-increment variable found in database',
            })
        }

        const newOder: HydratedDocument<OderDocument> = new Oder({
            _id: autoIncrement.autoIncrement,
            idUser: req.userId,
            name,
            address,
            phoneNumber,
            transportFee,
            productOder
        });
        await newOder.save();

        autoIncrement.autoIncrement = autoIncrement.autoIncrement + 1;
        await autoIncrement.save();

        productOder.forEach(async (value: IProductsOder) => {
            await Product.updateOne({'_id': value.idProduct},
                {
                    $pull: {
                        cart: {
                            idUser: req.userId
                        }
                    }
                }
            )
        })
        
        return res.status(200).json({
            success: true,
            message: 'Add new oder successfuly!',
            data: newOder
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error' 
        })
    }
});

/**
 * @route GET api/oder/admin
 * @desc Get oder to admin
 * @access Privater
 */
router.get('/admin', verifyAuth, async (req, res) => {
    try {
        if(!req.userAdmin) {
            return res.status(403).json({
                success: false,
                message: 'Insufficient authority!',
            })
        }

        const oder = await Oder.find();
        // const newOder = oder.

        return res.status(200).json({
            success: true,
            message: 'get list of successful orders!',
            data: oder.reverse()
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error' 
        })
    }
})

/**
 * @route GET api/oder/user
 * @desc Get oder to user
 * @access Privater
 */
router.get('/user', verifyAuth, async (req, res) => {
    try {
        const oder = await Oder.find({idUser: req.userId, isDeleted: false});

        return res.status(200).json({
            success: true,
            message: 'get list of successful orders!',
            data: oder
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error' 
        })
    }
});

/**
 * @route GET api/oder/cancel
 * @desc Submit a cancellation request
 * @access Privater
 */
router.get('/cancel/:id', verifyAuth, async (req, res) => {
    try {
        const oder = await Oder.findOneAndUpdate(
            {idUser: req.userId, _id: Number(req.params.id)}, 
            {
                status: 'SEND_REQUIRE'
            }, 
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: 'Order cancellation request has been sent!',
            data: oder
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error' 
        })
    }
})

/**
 * @route GET api/oder/delete-user/[id]
 * @desc set isDeleted order by id
 * @access Privater
 */
 router.get('/delete-user/:id', verifyAuth, async (req, res) => {
    try {
        const oder = await Oder.findOneAndUpdate(
            {idUser: req.userId, _id: Number(req.params.id)}, 
            {
                isDeleted: true
            }, 
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: 'set isDeleted order by id successfuly!',
            data: oder
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error' 
        })
    }
})

/**
 * @route GET api/oder/updated-admin/[id]
 * @desc Updated status
 * @access Privater
 */
router.post('/updated-admin/:id', verifyAuth, async (req, res) => {
    if(!req.userAdmin) {
        return res.status(403).json({
            success: false,
            message: 'Insufficient authority!',
        })
    }

    const {value} = req.body; 
    if(!value) {
        return res.status(403).json({
            success: false,
            message: 'incorrect data!',
        })
    }
    
    try {
        if(value === "IN_PROGRESS" || value === "COMPLETED" || value === "READY" || value === "CANCELLED") {
            const oder = await Oder.findOneAndUpdate(
                {_id: Number(req.params.id)}, 
                {
                    status: value
                }, 
                { new: true }
            );
    
            return res.status(200).json({
                success: true,
                message: 'Updated successfuly!',
                data: oder
            })
        }else {
            return res.status(403).json({
                success: false,
                message: 'incorrect data!',
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error' 
        })
    }
});

/**
 * @route GET api/oder/delete-user/[id]
 * @desc set isDeleted order by id
 * @access Privater
 */
router.get('/delete/:id', verifyAuth, async (req, res) => {
    if(!req.userAdmin) {
        return res.status(403).json({
            success: false,
            message: 'Insufficient authority!',
        })
    }

    try {
        const oder = await Oder.findByIdAndDelete({_id: Number(req.params.id)});
        if(!oder) {
            return res.status(200).json({
                success: true,
                message: 'Order Not Found!',
            })
        }

        return res.status(200).json({
            success: true,
            delete: true,
            message: 'Deleted successfuly!',
            data: oder
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error' 
        })
    }
})

export default router;