import argon2 from 'argon2';
import express, { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { HydratedDocument } from 'mongoose';
import verifyAuth from '../middleware/admin';
import User, { IUser } from '../models/User';

const router = express.Router();

/** Kiểm tra token từ client
 * @route GET api/auth
 * @desc Check if user is logger in (Kiểm tra xem người dùng có đăng nhập không)
 * @access Public [ai cũng có thể Check]
 */
router.get('/', verifyAuth, async (req, res) => {
    try {
        /**
         * Lấy user id từ client (do bác 'verifyToken' biên dịch ra gán vào req.userId)
         * và tìm xem trong db có user có id như thế hay không
         * select('-password'): lấy tất cả info của user trừ password
         */
        const user = await User.findById(req.userId).select('-password');

        if(!user){
            // Mặc dù đi qua được verifyToken là gần như chắc chắn có user
            // Nhưng check thêm cho an toàn @@
            return res.status(400).json({
                success: false,
                message: 'User not found (không tìm thấy user)',
            })
        }

        return res.status(200).json({
            success: true,
            user,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error (Lỗi máy chủ nội bộ)',
        })
    }
})

/**
 * @route POST api/auth/register
 * @desc Register user
 * @access Public [ai cũng có thể đk]
 */
router.post('/register', async (req: Request, res: Response) => {
    const {name, email, password} = req.body;

    // Check name or password
    if(!name || !password || !email) {
        return res.status(400)
            .json({
                success: false,
                message: `Missing ${!name ? 'name' : !password ? 'password' : 'email'}` 
            })
    }

    try {
        // Check for existing user
        const user = await User.findOne({email: email});

        if(user) {
            return res.status(400)
                .json({
                    success: false,
                    message: 'Email already taken' 
                })
        }

        const hashedPassword = await argon2.hash(password);
        const newUser: HydratedDocument<IUser> = new User({
            name,
            email,
            password: hashedPassword,
        });

        // save to mongoose
        await newUser.save();

        const accessToken = jwt.sign(
            {
                userId: newUser._id,
                userAdmin: newUser.admin,
            }, 
            process.env.ACCESS_TOKEN_SECRET as Secret
        )

        return res.status(200).json({
            success: true,
            message: 'User created successfuly',
            accessToken
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
 * @route POST api/auth/login
 * @desc Login user
 * @access Public 
 */
router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(400)
            .json({
                success: false, 
                message: 'Missing email or password (thiếu mất email hoặc password)',
            })
    }

    try {
        // Check for existing user
        const user = await User.findOne({email: email})
        if(!user) {
            return res.status(400)
                .json({
                    success: false, 
                    message: 'Incorrect email or password',
                })
        }

        // check password
        const passwordValid = await argon2.verify(user.password, password);
        if(!passwordValid) {
            return res.status(400)
                .json({
                    success: false, 
                    message: 'Incorrect email or password',
                })
        }

        const accessToken = jwt.sign(
            {
                userId: user._id,
                userAdmin: user.admin,
            }, 
            process.env.ACCESS_TOKEN_SECRET as Secret
        );

        return res.status(200).json({
            success: true,
            message: 'Logged in successfuly',
            accessToken
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
 * @route POST api/auth/avatar
 * @desc Update image user
 * @access private 
 */
router.post('/avatar', verifyAuth, async (req, res) => {
    const { img } = req.body;
    if(!img) {
        return res.status(400)
            .json({
                success: false, 
                message: 'Missing name image',
            })
        ;
    }
    
    try {
        if(!req.userId) {
            return res.status(400)
                .json({
                    success: false, 
                    message: 'User not found',
                })
            ;
        }

        const filter = { _id: req.userId };
        const update = { img };

        const user = await User.findOneAndUpdate(filter, update, { new: true });

        if(!user) {
            return res.status(400)
                .json({
                    success: false, 
                    message: 'User not found',
                })
            ;
        }

        return res.status(200).json({
            success: true,
            message: 'Update avatar successfuly',
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