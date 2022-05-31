import express from "express";
import {authUser, getUserProfile, registerUser, updateUserProfile} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post('/login', authUser) //用户登录
router
.route('/profile')
.get(protect, getUserProfile)
.put(protect, updateUserProfile) //授权用户才能进入profile界面
router.route('/').post(registerUser) //用户注册

export default router