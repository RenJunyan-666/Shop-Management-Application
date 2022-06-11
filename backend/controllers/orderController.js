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


//@desc 依据订单id获取订单
//@route GET/api/orders/:id
//@access private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    ) //填充用户信息

    if(order){
        res.json(order)
    }else{
        res.status(404)
        throw new Error('No this order')
    }
})

//@desc 获取所有订单
//@route GET/api/orders
//@access private(Admin)
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name') //关联到user
    res.json(orders)
})

//@desc 更新支付订单付款状态
//@route PUT/api/orders/:id/pay
//@access private(User)
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      }
      const updatedOrder = await order.save()
      res.json(updatedOrder)
    } else {
      res.status(404)
      throw new Error('Order Not Found')
    }
})

//@desc 更新支付订单发货状态
//@route PUT/api/orders/:id/deliver
//@access private(Admin)
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
      order.isDelivered = true
      order.deliveredAt = Date.now()
      const updatedOrder = await order.save()
      res.json(updatedOrder)
    } else {
      res.status(404)
      throw new Error('Order Not Found')
    }
})

//@desc 获取登录用户所有订单
//@route GET/api/orders/myorders
//@access private(User)
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({user:req.user._id})
    res.json(orders)
})

export {addOrderItems, getOrderById, getOrders, updateOrderToPaid, getMyOrders, updateOrderToDelivered}