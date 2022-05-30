import asyncHandler from 'express-async-handler' //捕获异常
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

//@desc 用户身份验证 & 获取token
//@route POST/api/users/login
//@access public
const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email}) //验证邮箱是否存在
    if(user && await user.matchPassword(password)) { //验证密码是否匹配
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('Email or Password is invalid!')
    }
})

//@desc 获取登录成功的用户详情
//@route GET/api/users/profile
//@access public
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        })
    }else{
        res.status(404)
        throw new Error('No this user')
    }
})

//@desc 注册一个新用户
//@route POST/api/users
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    const userExists = await User.findOne({email})
    if(userExists){ //已存在该用户
        res.status(400)
        throw new Error('user has existed')
    }

    //注册新用户
    const user = await User.create({name, email, password})
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('user invalid!')
    }
})

export {authUser, getUserProfile, registerUser}
