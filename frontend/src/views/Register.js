import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {register} from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const Register = ({history, location}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null) //提示密码不匹配

  const redirect = location.search ? location.search.split('=')[1] : '/'
  const dispatch = useDispatch()
  const userRegister = useSelector((state)=>state.userRegister)
  const {loading, error, userInfo} = userRegister

  useEffect(()=>{
    if(userInfo){
        history.push(redirect)
    }
  }, [history, userInfo, redirect])

  //表单提交函数
  const submitHandler = (event)=>{
      event.preventDefault()
      //dispatch register函数
      if(password !== confirmPassword){ //密码不匹配
        setMessage('not matched password!')
      }else{
          dispatch(register(name, email, password))
      }
  }

  return (
    <FormContainer>
        <h1>Register</h1>
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

            <Button type='submit' variant='primary'>Register</Button>
        </Form>
        <Row className='py-3'>
            <Col>
                Has account? <Link to={
                    redirect 
                    ? `/login?redirect=${redirect}` 
                    : '/login'
                }>go to login</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default Register