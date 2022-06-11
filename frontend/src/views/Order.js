import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Image, Card, ListGroup, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import Loader from '../components/Loader'
import { ORDER_PAY_RESET } from '../constants/orderConstants'
import { ORDER_DELIVER_RESET } from '../constants/orderConstants'
import {v4 as uuidv4} from 'uuid'
import axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2'

const Order = ({match, history}) => {
  const orderId = match.params.id //获取订单id
  const dispatch = useDispatch()

  //弹出框状态
  const [show, setShow] = useState(false);

  //支付二维码图片到状态
  const [image, setImage] = useState('')
  const [text] = useState('please scan QRcode')

  //SDK
  const [SDK, setSDK] = useState(false)

  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo} = userLogin

  const orderDetails = useSelector(state=>state.orderDetails)
  const {order, loading, error} = orderDetails

  const orderPay = useSelector(state=>state.orderPay)
  const {loading:loadingPay, success:successPay} = orderPay 

  const orderDeliver = useSelector(state=>state.orderDeliver)
  const {success:successDeliver} = orderDeliver

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
    //动态创建paypal script
    const addPayPalScript = async ()=>{
        const {data:clientId} = await axios.get('/api/config/paypal')
        //console.log(clientId)
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
        script.async = true

        script.onload = ()=>{
            setSDK(true)
        }
        document.body.appendChild(script)
    }

    if(!userInfo){ //判断用户是否登录
        history.push('/login')
    }
    if(!order || order._id !== orderId || successPay || successDeliver){ //如果没有订单，或者订单id与路由订单id不匹配，或订单支付完毕, 或发货完毕，则获取新的订单详情
        dispatch({type:ORDER_PAY_RESET})
        dispatch({type:ORDER_DELIVER_RESET})
        dispatch(getOrderDetails(orderId))
    }else if(!order.isPaid){
        if(!window.paypal){
            addPayPalScript()
        }else{
            setSDK(true)
        }
    }
    // eslint-disable-next-line
  }, [order, orderId, successPay, dispatch, history, userInfo, successDeliver])

  //开启和关闭弹出框的函数
  const handleClose = () => setShow(false);
  const handleShow = () => {
      //setImage(`https://www.thenewstep.cn/pay/index.php?pid=order._id`)
      setImage('/images/wechat.jpg')
      setShow(true);

    //   请求支付status
    //   let timer = setInterval(()=>{ //定时器
    //     axios.get('/status').then(res=>{
    //         if(res.data.status === 0){
    //             setText('Please scan QRcode')
    //         }else if(res.data.status === 1){
    //             setText('Please pay now')
    //         }else if(res.data.status === 2){
    //             setText('Please wait for shipping')
    //             clearTimeout(timer)
    //         }
    //     })
    //   }, 1000)
  }
  const handlePayment = ()=>{
    //创建支付结果对象
    const paymentResult = {
        id: uuidv4(),
        status: 2,
        update_time: Date.now(),
        email_address: order.user.email
    }
    //更新完成支付的订单
    dispatch(payOrder(orderId, paymentResult))
    setShow(false)
  }

  //点击发货函数
  const deliverHandler = ()=>{
      dispatch(deliverOrder(order))
  }

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

                        {/* paypal支付btn */}
                        {
                            !order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader/>}
                                    {
                                        order.paymentMethod === 'Paypal' && !SDK ? <Loader/> : (
                                            <PayPalButton 
                                            amount={order.totalPrice}
                                            onSuccess={handlePayment}></PayPalButton>
                                        )
                                    }
                                </ListGroup.Item>
                            )
                        }

                        {/* 微信支付btn */}
                        {
                            !order.isPaid && order.paymentMethod === 'wechat' && (
                                <ListGroup.Item>
                                    <Button 
                                    type='button' 
                                    className='btn-block' 
                                    onClick={handleShow}
                                    disabled={order.orderItems.length === 0}
                                    >Pay Now</Button>

                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                        <Modal.Title>Order id: {order._id}</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <p>Amount: ¥{order.totalPrice}</p>
                                            <p>Payment method: {order.paymentMethod}</p>
                                            <Row>
                                                <Col md={6} style={{textAlign:'center'}}>
                                                    <Image src={image}/>
                                                    <p style={{backgroundColor:'#00C800', color:'white'}}>{text}</p>
                                                </Col>
                                                <Col>
                                                    <Image src='/images/saoyisao.jpg'/>
                                                </Col>
                                            </Row>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="primary" onClick={handlePayment}>
                                                Complete Payment
                                            </Button>
                                            <Button variant="second" onClick={handleClose}>
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </ListGroup.Item>
                            )
                        }

                        {/* 发货btn, 必须登录且为管理员，且订单支付了且未发货 */}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item>
                                <Button 
                                    type='button' 
                                    className='btn-block' 
                                    onClick={deliverHandler}
                                    >Deliver Now</Button>
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default Order