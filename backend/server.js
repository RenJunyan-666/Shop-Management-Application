import express from 'express'
import dotenv from 'dotenv'
import products from './data/products.js'

dotenv.config()

const app = express()

app.get('/', (req, res) => {
    res.send('server running...')
})

//所有产品
app.get('/api/products', (req, res) => {
    res.json(products)
})

//单个产品
app.get('/api/products/:id', (req, res) => {
    const product = products.find(product=>product._id === req.params.id)
    res.json(product)
})

const PORT = process.env.PORT || 8000

app.listen(PORT, console.log(`Server is running under ${process.env.NODE_ENV} mode on port ${PORT}...`))