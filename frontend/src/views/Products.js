import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button, FormControl, Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import { createProductReview, listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { PRODUCT_CREATE_REVIEW_RESET, PRODUCT_DETAILS_RESET } from '../constants/productConstants'
import Meta from '../components/Meta'

const Products = ({match, history}) => {
  const [qty, setQty] = useState(1) //购买数量
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const {loading, error, product} = productDetails

  const productReview = useSelector(state => state.productReviewCreate)
  const { loading:loadingReview, error:errorReview, success:successReview} = productReview

  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo} = userLogin

  useEffect(()=>{
    if(successReview){
      alert('Successful Comment')
      setRating(0)
      setComment('')
    }
    if(!product._id || product._id !== match.params.id || successReview){
      dispatch({type:PRODUCT_DETAILS_RESET})
      dispatch(listProductDetails(match.params.id))
      dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
    }
  }, [dispatch, match, successReview, product._id])

  //添加到购物车事件
  const addToCartHandler = ()=>{
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  //提交评论内容的函数
  const submitHandler = (event)=>{
    event.preventDefault() //阻止表单默认事件
    dispatch(createProductReview(match.params.id, {rating, comment}))
  }

  return <>
      <Link className='btn btn-dark my-3' to='/'>Back</Link>
      {loading 
      ? <Loader/> 
      : error 
      ? <Message variant='danger'>{error}</Message> 
      : (
        <>
          <Meta title={product.name}/>
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
                  Description: {product.description}
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

          {/* 评价区域 */}
          <Row>
            <Col md={6}>
              <h2>Comments</h2>
              {product.reviews && product.reviews.length === 0 && (
                <Message>No Comments</Message>
              )}
              <ListGroup variant='flush'>
                {product.reviews &&
                  product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                <ListGroup.Item>
                  <h2>add comment</h2>
                  {loadingReview && <Loader />}
                  {errorReview && (
                    <Message variant='danger'>{errorReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group>
                        <Form.Label>Rating:</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>choose rating...</option>
                          <option value={1}>1 - very bad</option>
                          <option value={2}>2 - bad</option>
                          <option value={3}>3 - normal</option>
                          <option value={4}>4 - good</option>
                          <option value={5}>5 - very good</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary'>
                        submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>Login</Link> first
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
  </>
}

export default Products