import express from "express";
import asyncHandler from 'express-async-handler' //捕获异常
import Product from '../models/productModel.js'

const router = express.Router()

//@desc 请求所有产品
//@route GET/api/products
//@access public
router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({})
    //测试错误发生
    //res.status(401)
    //throw new Error('no permission!')
    res.json(products)
}))

//@desc 请求单个产品
//@route GET/api/products/:id
//@access public
router.get('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        res.json(product)
    }
    else{
        res.status(404)
        throw new Error('Not Found')
    }
}))

export default router