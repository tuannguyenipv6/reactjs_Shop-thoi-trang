import express from "express";
import { HydratedDocument } from "mongoose";
import verifyAuth from '../middleware/admin';
import ShipmentDetails, { ShipmentDetailsDocument } from '../models/ShipmentDetails';

const router = express.Router();

/**
 * @route POST api/shipment-details
 * @desc Add shipment details to user
 * @access Private
 */
router.post('/', verifyAuth,  async (req, res) => {
    const {address, fullName, phoneNumber} = req.body;
    if(!address || !fullName || !phoneNumber) {
        return res
            .status(400)
            .json({
                success: false, 
                message: `Missing the value: ${!address ? 'address, ' : ''}${!fullName ? 'fullName, ' : ''}${!phoneNumber ? 'phoneNumber' : ''}`
            })
        ;
    }
    
    try {
        const shipmentDetails = await ShipmentDetails.findById({_id: req.userId});

        if(shipmentDetails) {
            // Update
            const filter = { _id: req.userId };
            const update: HydratedDocument<ShipmentDetailsDocument> = new ShipmentDetails({
                address,
                fullName,
                phoneNumber,
            });
            const updated = await ShipmentDetails.findOneAndUpdate(filter, update, { new: true });

            if(!updated) {
                return res.status(400)
                    .json({
                        success: false, 
                        message: 'update failure!',
                    })
                ;
            }
    
            return res.status(200).json({
                success: true,
                message: 'Update info successfuly',
                data: updated,
            })
        }else {
            // Add
            const newShipmentDetails: HydratedDocument<ShipmentDetailsDocument> = new ShipmentDetails({
                address,
                fullName,
                phoneNumber,
                _id: req.userId
            });
    
            await newShipmentDetails.save();
            
            return res.status(200).json({
                success: true,
                message: 'Add new Product successfuly!',
                data: newShipmentDetails
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
 * @route POST api/shipment-details
 * @desc Add shipment details to user
 * @access Private
 */
 router.get('/', verifyAuth,  async (req, res) => {
    try {
        const shipmentDetails = await ShipmentDetails.findById({_id: req.userId});

        if(!shipmentDetails) {
            return res.status(200).json({
                success: false,
                message: 'Can not find by id!'
            })
        }else {
            return res.status(200).json({
                success: true,
                message: 'Get shipment details successfuly!',
                data:  shipmentDetails
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

export default router;