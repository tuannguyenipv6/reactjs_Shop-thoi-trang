import express from 'express';
import { HydratedDocument } from 'mongoose';
import verifyAuth from '../middleware/admin';
import Slider, { SliderDocument } from '../models/Slider';

const router = express.Router();

/**
 * @route POST api/slider
 * @desc add new slider
 * @access Privater
 */
router.post('/', verifyAuth, async (req, res) => {
    if(!req.userAdmin) {
        return res.status(403).json({
            success: false,
            message: 'Insufficient authority!',
        })
    }

    const {title, name, description, img, idKey, isProduct} = req.body;
    if(!title || !name || !description || !img) {
        return res.status(400)
            .json({
                success: false,
                message: `Missing the value` 
            })
        ;
    }

    try {
        const newSlider: HydratedDocument<SliderDocument> = new Slider({
            title, name, description, img, idKey, isProduct
        });
        await newSlider.save();

        return res.status(200).json({
            success: true,
            message: 'Add new Slider successfully!',
            data: newSlider
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
 * @route GET api/slider
 * @desc add new slider
 * @access Public
 */
router.get('/', async (_req, res) => {
    try {
        const slider = await Slider.find({});

        return res.status(200).json({
            success: true,
            message: 'Get all slider successfully!',
            data: slider.reverse()
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error' 
        })
    }
});

export default router;