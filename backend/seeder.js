import mongoose from "mongoose";
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config() //拿到uri
connectDB() //连接数据库

//插入样本数据到数据库
const importData = async ()=>{
    try {
        //清空数据库中的样本数据
        await Order.deleteMany()
        await User.deleteMany()
        await Product.deleteMany()

        //实现样本数据的插入
        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]._id //获取产品模型关联的user id
        const sampleProducts = products.map(product=>{ 
            return {...product, user:adminUser} //向产品数据库中添加user字段
        })

        //添加产品模型到数据库
        await Product.insertMany(sampleProducts)
        console.log('sample data has been added successfully!'.green.inverse)
        process.exit()
    } catch (error) {
        console.log(`Error: ${error}`.red.inverse)
        process.exit(1)
    }
}

//销毁样本数据
const desdroyData = async ()=>{
    try {
        //清空数据库中的样本数据
        await Order.deleteMany()
        await User.deleteMany()
        await Product.deleteMany()

        console.log('sample data has been destroyed successfully!'.green.inverse)
        process.exit()
    } catch (error) {
        console.log(`Error: ${error}`.red.inverse)
        process.exit(1)
    }
}

//判断命令行执行的函数
if(process.argv[2] === '-d'){
    desdroyData()
}
else{
    importData()
}