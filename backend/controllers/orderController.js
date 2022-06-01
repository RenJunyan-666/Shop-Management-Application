import asyncHandler from 'express-async-handler' //捕获异常
import Order from '../models/orderModel.js'

//@desc 创建订单
//@route POST/api/orders
//@access private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems, 
        shippingAddress, 
        paymentMethod, 
        itemsPrice, 
        shippingPrice, 
        totalPrice
    } = req.body

    if(orderItems && orderItems.length === 0){ //没有订单
        res.status(400)
        throw new Error('no orders')
    }else{
        const order = new Order({
            user:req.user._id,
            orderItems, 
            shippingAddress, 
            paymentMethod, 
            itemsPrice, 
            shippingPrice, 
            totalPrice
        })

        const createOrder = await order.save()
        res.status(201).json(createOrder)
    }
})

export {addOrderItems}