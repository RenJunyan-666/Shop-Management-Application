import React, { useEffect } from 'react'
import { Button, Row, Col, Image, Card, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import { getOrderDetails } from '../actions/orderActions'
import Loader from '../components/Loader'

const Order = ({match}) => {
  const orderId = match.params.id //获取订单id
  const dispatch = useDispatch()
  const orderDetails = useSelector(state=>state.orderDetails)
  const {order, loading, error} = orderDetails

  //计算价格
  if(!loading){
    const addDecimals = (num)=>{ //返回小数点后两位
        return (Math.round(num * 100) / 100).toFixed(2)
    }
    
    order.itemsPrice = addDecimals(order.orderItems.reduce(
        (acc, item) => acc + item.price * item.qty, 
        0
    ))
  }

  useEffect(()=>{
    if(!order || order._id !== orderId){ //如果没有订单，或者订单id与路由订单id不匹配，则获取新的订单详情
        dispatch(getOrderDetails(orderId))
    }
    // eslint-disable-next-line
  }, [order, orderId])

  return (
    loading 
    ? <Loader />
    : error 
    ? <Message variant='danger'>{error}</Message>
    : <>
        <h1>Order ID: {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping Address</h2>
                        <p>
                            <strong>address: </strong>
                        </p>
                        <p>
                            <strong>Name: </strong>{order.user.name}
                        </p>
                        <p>
                            <strong>Email: </strong>
                            <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                        </p>
                        <p>
                            {order.shippingAddress.address}, 
                            {order.shippingAddress.city}, 
                            {order.shippingAddress.province}, 
                            {order.shippingAddress.postalCode}
                        </p>

                        {
                            order.isDelivered 
                            ? (<Message variant='success'>shipping time: {order.deliveredAt}</Message>)
                            : (<Message variant='danger'>Wait for shipping</Message>)
                        }
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>payment: </strong>
                            {order.paymentMethod}
                        </p>
                        {
                            order.isPaid
                            ? (<Message variant='success'>paid time: {order.paidAt}</Message>)
                            : (<Message variant='danger'>Wait for paying</Message>)
                        }
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Products Orders</h2>
                        <>
                            <strong>orders: </strong>
                            {
                                order.orderItems.length === 0 
                                ? <Message>Cart is empty</Message>
                                : (<ListGroup variant='flush'>
                                    {order.orderItems.map(item => (
                                        <ListGroup.Item key={item.product}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image 
                                                    src={item.image} 
                                                    alt={item.name}
                                                    fluid
                                                    rounded/>
                                                </Col>

                                                <Col>
                                                    <Link to={`/products/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>

                                                <Col md={4}>
                                                    {item.qty} X {item.price} = ¥{item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>)
                            }
                        </>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Bill</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Product:</Col>
                                <Col>¥{order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Fare</Col>
                                <Col>¥{order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total Price:</Col>
                                <Col>¥{order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default Order