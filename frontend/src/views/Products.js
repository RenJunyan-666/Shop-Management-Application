import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button, FormControl} from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const Products = ({match, history}) => {
  const [qty, setQty] = useState(1) //购买数量
  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const {loading, error, product} = productDetails

  useEffect(()=>{
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match])

  //添加到购物车事件
  const addToCartHandler = ()=>{
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  return <>
      <Link className='btn btn-dark my-3' to='/'>Back</Link>
      {loading 
      ? <Loader/> 
      : error 
      ? <Message variant='danger'>{error}</Message> 
      : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid/>
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={product.rating} text={`${product.numReviews} comments`}/>
              </ListGroup.Item>
              <ListGroup.Item>
                Price: ¥{product.price}
              </ListGroup.Item>
              <ListGroup.Item>
                Description: ¥{product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price: </Col>
                    <Col>
                      <strong>¥{product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Stock: </Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'No Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Number:</Col>
                    <Col>
                      <FormControl 
                      as='select' 
                      value={qty} 
                      onChange={(event)=>setQty(event.target.value)}>
                        {[...Array(product.countInStock).keys()].map(idx => (
                          <option key={idx+1} value={idx+1}>
                            {idx + 1}
                          </option>
                        ))}
                      </FormControl>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button 
                  onClick={addToCartHandler}
                  className='btn-block' 
                  type='button' 
                  disabled={product.countInStock===0}
                  >add cart</Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
  </>
}

export default Products