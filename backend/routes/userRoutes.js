import express from "express";
import {authUser, deleteUser, getUserById, getUserProfile, getUsers, registerUser, updateUser, updateUserProfile} from "../controllers/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post('/login', authUser) //用户登录

router
.route('/profile')
.get(protect, getUserProfile)
.put(protect, updateUserProfile) //授权用户才能进入profile界面

router.route('/')
.post(registerUser) //用户注册
.get(protect, admin, getUsers) //获取所有用户，必须验证是否授权且是否为管理员

router.route('/:id')
.delete(protect, admin, deleteUser) //删除用户
.get(protect, admin, getUserById) //获取单个用户信息
.put(protect, admin, updateUser) //更新单个用户信息

export default router