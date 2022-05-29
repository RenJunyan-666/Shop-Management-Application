import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, ListGroup, Image, FormControl, Button, Card} from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

const Cart = ({match, location, history}) => {
  const productId = match.params.id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const {cartItems} = cart

  useEffect(()=>{
    if(productId){ //如果当前购物车页面为选择产品后跳转到状态
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id)=>{
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = ()=>{
    history.push('/login?redirect=shipping')
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Cart</h1>
        {cartItems.length === 0
         ? (<Message>Cart is empty <Link to='/'>Back to Home</Link></Message>)
         : (<ListGroup variant='flush'>
           {cartItems.map(item => (
             <ListGroup.Item key={item.product}>
               <Row>
                 <Col md={2}>
                  <Image src={item.image} alt={item.name} fluid rounded/>
                 </Col>
                 <Col md={3}>
                  <Link to={`/products/${item.product}`}>{item.name}</Link>
                 </Col>
                 <Col md={2}>
                  {item.price}
                 </Col>
                 <Col md={2}>
                  <FormControl 
                    as='select' 
                    value={item.qty} 
                    onChange={event => dispatch(addToCart(item.product, Number(event.target.value)))}
                  >
                    {[...Array(item.countInStock).keys()].map(idx => (
                      <option key={idx+1} value={idx+1}>
                        {idx + 1}
                      </option>
                    ))}
                  </FormControl>
                 </Col>
                 <Col>
                    <Button type='button' onClick={()=>removeFromCartHandler(item.product)}>
                      <i className='fas fa-trash'></i>
                    </Button>
                 </Col>
               </Row>
             </ListGroup.Item>
           ))}
         </ListGroup>)}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Total Products: {cartItems.reduce((acc, item)=> acc + item.qty, 0)}</h2>
              ¥{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}
              <ListGroup.Item>
                <Button
                 type='button'
                 className='btn-block'
                 disabled={
                  cartItems.length === 0
                }
                 onClick={checkoutHandler}
                >
                  Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default Cart