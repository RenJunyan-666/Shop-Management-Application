import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

//保护路由
const protect = asyncHandler( async (req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){ //token存在
        try {
            token = req.headers.authorization.split(' ')[1] //获取token
            const decoded = jwt.verify(token, process.env.JWT_SECRET) //解码
            req.user = await User.findById(decoded.id).select('-password') //获取匹配的用户且不返回密码
            next()
        } catch (error) {
            res.status(401)
            throw new Error('No permission, token validation failed!')
        }
    }

    if(!token){ //token不存在
        res.status(401)
        throw new Error('No permission, no this token!')
    }
})

export {protect}