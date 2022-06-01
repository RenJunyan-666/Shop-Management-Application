import React, { useEffect } from 'react'
import { Button, Row, Col, Image, Card, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import { createOrder } from '../actions/orderActions'

const Placeorder = ({history}) => {
  const cart = useSelector(state=>state.cart)
  const {shippingAddress, paymentMethod, cartItems} = cart
  const dispatch = useDispatch()

  //计算价格
  const addDecimals = (num)=>{ //返回小数点后两位
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(cartItems.reduce(
    (acc, item) => acc + item.price * item.qty, 
    0
  ))
  cart.shippingPrice = addDecimals(cart.itemsPrice > 5000 ? 0 : 20)
  cart.totalPrice = addDecimals(Number(cart.itemsPrice) + Number(cart.shippingPrice))

  const orderCreate = useSelector(state=>state.orderCreate)
  const {order, success, error} = orderCreate

  useEffect(()=>{
    if(success){ //如果确认订单，那么之后退出了再到当前页面会直接跳转到订单页面
        history.push(`/order/${order._id}`)
    }
    // eslint-disable-next-line
  }, [history, success])

  const placeorderHandler = ()=>{
      dispatch(createOrder({
          orderItems:cartItems,
          shippingAddress:shippingAddress,
          paymentMethod:paymentMethod,
          itemsPrice:cart.itemsPrice,
          shippingPrice:cart.shippingPrice,
          totalPrice:cart.totalPrice
    }))
  }

  return (
    <>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping Address</h2>
                        <p>
                            <strong>address: </strong>
                            {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.province}, {shippingAddress.postalCode}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>payment: </strong>
                            {paymentMethod}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Products Orders</h2>
                        <p>
                            <strong>orders: </strong>
                            {
                                cartItems.length === 0 
                                ? <Message>Cart is empty</Message>
                                : (<ListGroup variant='flush'>
                                    {cartItems.map(item => (
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
                        </p>
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
                                <Col>¥{cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Fare</Col>
                                <Col>¥{cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total Price:</Col>
                                <Col>¥{cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {
                                error && <Message variant='danger'>{error}</Message>
                            }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button 
                            type='button' 
                            className='btn-block' 
                            onClick={placeorderHandler}
                            disabled={cartItems.length === 0}
                            >Place Order</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default Placeorder