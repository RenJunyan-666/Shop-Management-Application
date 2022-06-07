import asyncHandler from 'express-async-handler' //捕获异常
import Product from '../models/productModel.js'

//@desc 请求所有产品
//@route GET/api/products
//@access public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    //测试错误发生
    //res.status(401)
    //throw new Error('no permission!')
    res.json(products)
})

//@desc 请求单个产品
//@route GET/api/products/:id
//@access public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        res.json(product)
    }
    else{
        res.status(404)
        throw new Error('Not Found')
    }
})

//@desc 删除单个产品
//@route DELETE/api/products/:id
//@access private
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        await product.remove()
        res.json({message:'product deleted successfully!'})
    }
    else{
        res.status(404)
        throw new Error('Not Found')
    }
})

//@desc 创建单个产品
//@route POST/api/products
//@access private
const createProduct = asyncHandler(async (req, res) => {
    //创建一个产品模版
    const product = new Product({
        name:'样本产品',
        price:0,
        user:req.user._id,
        image:'/images/sample.jpg',
        brand:'样品品牌',
        category:'样品分类',
        countInStock:0,
        numReviews:0,
        description:'样本描述',
        rating:0
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

//@desc 更新产品内容
//@route PUT/api/products/:id
//@access private
const updateProduct = asyncHandler(async (req, res) => {
    const {name, price, description, image, brand, category, countInStock} = req.body
    const product = await Product.findById(req.params.id)

    if(product){
        product.name = name,
        product.price = price,
        product.description = description,
        product.image = image,
        product.brand = brand,
        product.category = category,
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)
    }else{
        res.status(404)
        throw new Error('Not Found')
    }
})

export {getProducts, getProductById, deleteProduct, createProduct, updateProduct}