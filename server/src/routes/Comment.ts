import express, { Request, Response } from 'express';
import { HydratedDocument } from 'mongoose';
import verifyAuth from '../middleware/admin';
import Comment, { IComment } from '../models/Comment';
import Product from '../models/Product';

const router = express.Router();

/**
 * @route POST api/comment/id
 * @desc add and update comment to product
 * @access Privater
 */
router.post('/:id', verifyAuth, async (req: Request, res: Response) => {
    const {name, avatar, date, content, star} = req.body;

    // Check name or password
    if(!name || !avatar || !date || !content || star === 'undefined') {
        return res.status(400)
            .json({
                success: false,
                message: `Missing the value` 
            })
    }

    try {
        const isComment = await Comment.findOne({user: req.userId, product: Number(req.params.id)})
        
        // nếu có isComment thì update lại theo dữ liệu mới
        if(isComment) {
            const comment = await Comment.findOneAndUpdate({user: req.userId, product: Number(req.params.id)}, {
                avatar,
                date,
                content,
                star
            }, { new: true });

            await Product.updateOne(
                {_id: Number(req.params.id), 'evaluates.idUser': req.userId},
                {'$set': {
                    'evaluates.$.evaluate': star,
                }}
            )

            return res.status(200).json({
                success: true,
                message: "Update comment successfuly",
                comment,
            })
        }

        const newComment: HydratedDocument<IComment> = new Comment({
            name,
            avatar,
            date,
            content,
            star,
            product: req.params.id,
            user: req.userId
        });

        const product = await Product.findById({_id: req.params.id})

        product?.evaluates?.push({
            idUser: req.userId,
            evaluate: star
        })


        // save to mongoose
        await newComment.save();
        await product?.save();

        return res.status(200).json({
            success: true,
            message: 'add new comment successfuly',
            comment: newComment,
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
 * @route GET api/comment/id
 * @desc get conment by product
 * @access Public
 */
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const comments = await Comment.find({ product: Number(req.params.id) });

        return res.status(200).json({
            success: true,
            message: 'successfuly',
            comments: comments.reverse()
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