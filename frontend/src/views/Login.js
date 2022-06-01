import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {login} from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const Login = ({history, location}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const redirect = location.search ? location.search.split('=')[1] : '/'
  const dispatch = useDispatch()
  const userLogin = useSelector((state)=>state.userLogin)
  const {loading, error, userInfo} = userLogin

  useEffect(()=>{
    if(userInfo){
        history.push(redirect)
    }
  }, [history, userInfo, redirect])

  //表单提交函数
  const submitHandler = (event)=>{
      event.preventDefault()
      //dispatch login函数
      dispatch(login(email, password))
  }

  return (
    <FormContainer>
        <h1>Login</h1>
        {
            error && <Message variant='danger'>{error}</Message>
        }
        {
            loading && <Loader/>
        }
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>Email: </Form.Label>
                <Form.Control 
                type='text' 
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

            <Button type='submit' variant='primary'>Login</Button>
        </Form>
        <Row className='py-3'>
            <Col>
                New user? <Link to={
                    redirect 
                    ? `/register?redirect=${redirect}` 
                    : '/register'
                }>go to register</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default Login