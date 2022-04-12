import express from 'express';
import { uploadImage, upLoad } from '../controllers/uploadImage';

const router = express.Router();

/**
 * @route POST api/upload-image
 * @desc up img
 * @access Private
 */
router.post('/', uploadImage, upLoad);

export default router;