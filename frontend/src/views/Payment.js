import React, { useState } from 'react'
import {Form, Button, Col } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const Payment = ({history}) => {
  const cart = useSelector(state=>state.cart)
  const {shippingAddress} = cart
  const dispatch = useDispatch()

  if(!shippingAddress){ //没有填写收货地址
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('wechat')

  const submitHandler = (event)=>{
      event.preventDefault()
      dispatch(savePaymentMethod(paymentMethod))
      history.push('/placeorder')
  }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3/>
        <h1>Payment Methods</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>choose payment method</Form.Label>
                <Col>
                    <Form.Check 
                    type='radio' 
                    label='wechat' 
                    id='wechat' 
                    name='paymentMethod' 
                    value='wechat'
                    checked
                    onChange={(event)=>setPaymentMethod(event.target.value)}
                    />

                    <Form.Check 
                    type='radio' 
                    label='Paypal' 
                    id='Paypal' 
                    name='paymentMethod' 
                    value='Paypal'
                    onChange={(event)=>setPaymentMethod(event.target.value)}
                    />
                </Col>
            </Form.Group>

            <Button type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default Payment