import mongoose from "mongoose";

//评论内容
const reviewSchema = mongoose.Schema({
    name:{type:String, required:true},
    rating:{type:Number, required:true},
    comment:{type:String, required:true} 
}, {
    timestamps:true
})

//产品模型
const productSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User' //产品模型关联用户模型
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    reviews:[reviewSchema],
    numReviews:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true,
        default:0
    },
    countInStock:{
        type:Number,
        required:true,
        default:0
    }
}, {
    timestamps:true //有创建和更新时间
})

const Product = mongoose.model('Product', productSchema)

export default Product