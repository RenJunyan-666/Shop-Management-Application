import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddlleware.js'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import path from 'path'
import axios from 'axios'
import morgan from 'morgan'

dotenv.config()
connectDB()

const app = express()
app.use(express.json()) 

if(process.env.NODE_ENV === 'development'){ //只在开发环境运用
    app.use(morgan('dev'))
}

app.get('/', (req, res) => {
    res.send('server running...')
})

//获取支付的status状态码
// app.get('/status', (req, res)=>{
//     axios.get('https://www.thenewstep.cn/pay/logs/log.txt')
//     .then(response => {
//         res.json({status:response.data})
//     })
// })

//获取paypal的clientID
app.get('/api/config/paypal', (req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
})

app.use('/api/products', productRoutes) //使用产品路由
app.use('/api/users', userRoutes) //使用用户路由
app.use('/api/orders', orderRoutes) //使用订单路由
app.use('/api/upload', uploadRoutes) //使用文件上传路由

//upload
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//错误处理中间件
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 8000

app.listen(PORT, console.log(`Server is running under ${process.env.NODE_ENV} mode on port ${PORT}...`.yellow.bold))