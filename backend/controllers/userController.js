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
//@access private
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

//@desc 更新用户资料
//@route PUT/api/users/profile
//@access private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    //获取更新后的资料
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }
        const updateUser = await user.save()
        res.json({ //返回更新后的用户信息
            _id:updateUser._id,
            name:updateUser.name,
            email:updateUser.email,
            isAdmin:updateUser.isAdmin,
            token:generateToken(updateUser._id)
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

//@desc 获取所有用户
//@route GET/api/users
//@access private(Admin)
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

//@desc 删除注册用户
//@route DELETE/api/users/:id
//@access private(Admin)
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if(user){
        await user.remove()
        res.json({message:'user deleted'})
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})

//@desc 获取单个用户信息
//@route GET/api/users/:id
//@access private(Admin)
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password') //不要密码
    if(user){
        res.json(user)
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})

//@desc 更新单个用户信息
//@route PUT/api/users/:id
//@access private(Admin)
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin

        const updateUser = await user.save()
        res.json({ //返回更新后的用户信息
            _id:updateUser._id,
            name:updateUser.name,
            email:updateUser.email,
            isAdmin:updateUser.isAdmin
        })
    }else{
        res.status(404)
        throw new Error('No this user')
    }
})

export {authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser}
