import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddlleware.js'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()
connectDB()

const app = express()
app.use(express.json()) 

app.get('/', (req, res) => {
    res.send('server running...')
})

app.use('/api/products', productRoutes) //使用产品路由
app.use('/api/users', userRoutes) //使用用户路由

//错误处理中间件
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 8000

app.listen(PORT, console.log(`Server is running under ${process.env.NODE_ENV} mode on port ${PORT}...`.yellow.bold))