import React, { useEffect, useState } from 'react'
import {Form, Button, Row, Col, Table} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getUserDetails, updateUserProfile} from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMyOrders } from '../actions/orderActions'
import { LinkContainer } from 'react-router-bootstrap'

const Profile = ({history}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null) //提示密码不匹配

  const dispatch = useDispatch()

  const userDetails = useSelector((state)=>state.userDetails)
  const {loading, error, user} = userDetails

  const userLogin = useSelector((state)=>state.userLogin)
  const {userInfo} = userLogin

  const userUpdateProfile = useSelector((state)=>state.userUpdateProfile)
  const {success} = userUpdateProfile

  const myOrders = useSelector(state=>state.orderListMy)
  const {loading:loadingOrders, error:errorOrders, orders} = myOrders

  useEffect(()=>{
    if(!userInfo){ //没有登录
        history.push('/login')
    }else{
        if(!user.name){ //没有用户字段，需要获取用户详情
            dispatch({type:USER_UPDATE_PROFILE_RESET})
            dispatch(getUserDetails('profile'))
            dispatch(listMyOrders())
        }else{ //加载进来默认有相应的值
            setName(user.name)
            setEmail(user.email)
        }
    }
  }, [history, userInfo, user, dispatch])

  //表单提交函数，更新用户资料
  const submitHandler = (event)=>{
      event.preventDefault()
      //dispatch update profile函数
      if(password !== confirmPassword){ //密码不匹配
        setMessage('not matched password!')
      }else{
        dispatch(updateUserProfile({
            id:user._id,
            name,
            email,
            password
        }))
      }
  }

  return (
    <Row>
       <Col md={3}>
        <h1>User Profile</h1>
        {
            success && <Message variant='success'>Update Successfully!</Message>
        }
        {
            message && <Message variant='danger'>{message}</Message>
        }
        {
            error && <Message variant='danger'>{error}</Message>
        }
        {
            loading && <Loader/>
        }
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>Name: </Form.Label>
                <Form.Control 
                type='name' 
                placeholder='input name' 
                value={name}
                onChange={(event)=>setName(event.target.value)}
                />
            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label>Email: </Form.Label>
                <Form.Control 
                type='email' 
                placeholder='input email' 
                value={email}
                onChange={(event)=>setEmail(event.target.value)}
                />
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Password: </Form.Label>
                <Form.Control 
                type='password' 
                placeholder='input password' 
                value={password}
                onChange={(event)=>setPassword(event.target.value)}
                />
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password: </Form.Label>
                <Form.Control 
                type='password' 
                placeholder='confirm password' 
                value={confirmPassword}
                onChange={(event)=>setConfirmPassword(event.target.value)}
                />
            </Form.Group>

            <Button type='submit' variant='primary'>Update</Button>
        </Form>
       </Col>
       <Col md={9}>
        <h2>My Orders</h2>
        {
            loadingOrders 
            ? <Loader/> 
            : errorOrders 
            ? <Message variant='danger'>{errorOrders}</Message>
            : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Created Date</th>
                        <th>Total Price</th>
                        <th>Payment Status</th>
                        <th>Shipping Status</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {orders.map(order=>(
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0,10) : (
                                    <i className='fas fa-times' style={{color:'red'}}></i>
                                )}</td>
                                <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : (
                                    <i className='fas fa-times' style={{color:'red'}}></i>
                                )}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button variant='light' className='btn-sm'>view details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )
        }
       </Col>
    </Row>
  )
}

export default Profile