import { NextFunction, Request, Response } from "express";

const jwt = require('jsonwebtoken');

const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
    const headerReq = req.header('Authorization');
    const token = headerReq && headerReq.split(' ')[1];

    if(!token) {
        return res
            .status(401)
            .json({
                success: false, 
                message: 'Access token not founfd!'
            })
        ;
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userAdmin = decoded.userAdmin;
        req.userId = decoded.userId;
        return next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({
            success: false,
            message: 'Invalid token',
        })
    }
}

export default verifyAuth;