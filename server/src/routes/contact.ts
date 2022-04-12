import express from "express";
import Contact, { IContact } from "../models/Contact";
import { HydratedDocument } from 'mongoose';
import verifyAuth from '../middleware/admin';

const router = express.Router();

/**
 * @route POST api/contact
 * @desc Add contact info
 * @access Public 
 */
router.post('/', async (req, res) => {
    const {name, phone, email, description} = req.body;

    if(!name || !phone || !email || !description) {
        return res.status(400)
            .json({
                success: false,
                message: `Missing ${!name ? 'name' : !phone ? 'phone' : !email ? 'email' : 'description'}`
            })
        ;
    }

    try {
        const newContactInfo: HydratedDocument<IContact> = new Contact({
            name,
            phone,
            email,
            description
        });

        await newContactInfo.save();

        return res.status(200).json({
            success: true,
            message: 'Information has been sent!',
            contact: newContactInfo,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error' 
        })
    }
})

/**
 * @route GET api/contact
 * @desc Get contact info
 * @access Private 
 */
router.get('/', verifyAuth, async (req, res) => {
    if(!req.userAdmin) {
        return res.status(403).json({
            success: false,
            message: 'Insufficient authority!',
        })
    }

    try {
        const contactInfo = await Contact.find();
        return res.status(200).json({
            success: true,
            message: 'All contact!',
            contact: contactInfo
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