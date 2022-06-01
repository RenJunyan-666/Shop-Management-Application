import React, { useState } from 'react'
import {Form, Button } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

const Shipping = ({history}) => {
  const cart = useSelector((state)=>state.cart)
  const {shippingAddress} = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [province, setProvince] = useState(shippingAddress.province)

  const dispatch = useDispatch()

  //提交收货地址函数
  const submitHandler = (event)=>{
    event.preventDefault() //表单阻止默认事件
    dispatch(saveShippingAddress({
        address,
        city,
        postalCode,
        province
    }))
    history.push('/payment')
  }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2/>
        <h1>Address</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
                <Form.Label>Address: </Form.Label>
                <Form.Control 
                type='text' 
                placeholder='input address' 
                value={address}
                onChange={(event)=>setAddress(event.target.value)}
                />
            </Form.Group>

            <Form.Group controlId='city'>
                <Form.Label>City: </Form.Label>
                <Form.Control 
                type='text' 
                placeholder='input city' 
                value={city}
                onChange={(event)=>setCity(event.target.value)}
                />
            </Form.Group>

            <Form.Group controlId='postalCode'>
                <Form.Label>Postal Code: </Form.Label>
                <Form.Control 
                type='text' 
                placeholder='input postalCode' 
                value={postalCode}
                onChange={(event)=>setPostalCode(event.target.value)}
                />
            </Form.Group>

            <Form.Group controlId='province'>
                <Form.Label>Province: </Form.Label>
                <Form.Control 
                type='text' 
                placeholder='input province' 
                value={province}
                onChange={(event)=>setProvince(event.target.value)}
                />
            </Form.Group>

            <Button type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default Shipping