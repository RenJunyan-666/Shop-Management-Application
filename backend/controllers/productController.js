import asyncHandler from 'express-async-handler' //捕获异常
import Product from '../models/productModel.js'

//@desc 请求所有产品
//@route GET/api/products?keyword=${keyword}
//@access public
const getProducts = asyncHandler(async (req, res) => {
    //每页展示的产品数量
    const pageSize = 6
    const page = Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword
        ? {
            name: {
            $regex: req.query.keyword,
            $options: 'i',
            },
        }
        : {}

    //获取产品数量（包括符合条件的关键词）
    const count = await Product.countDocuments({ ...keyword })
    const products = await Product.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
    res.json({ products, page, pages: Math.ceil(count / pageSize) })
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

//@desc 创建产品评论
//@route POST/api/products/:id/reviews
//@access private(User)
const createProductReview = asyncHandler(async (req, res) => {
    const {rating, comment} = req.body
    const product = await Product.findById(req.params.id)

    if(product){
        //判断用户是否已经评论
        const alreadyReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString())

        if(alreadyReviewed){
            res.status(400)
            throw new Error('You have commented this product!')
        }

        //创建新评论
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        product.reviews.push(review)

        //更新产品的评论数及星级
        product.numReviews = product.reviews.length
        product.rating = (product.reviews.reduce((acc, review)=> acc + review.rating, 0)) / product.reviews.length
        await product.save()
        res.status(201).json({message:'Successful comment!'})
    }else{
        res.status(404)
        throw new Error('Not Found')
    }
})

export {getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview}