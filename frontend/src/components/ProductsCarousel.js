import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { listTopProducts } from '../actions/productActions'
import Loader from './Loader'
import Message from './Message'
import { Carousel, Image } from 'react-bootstrap'

const ProductsCarousel = () => {
  const dispatch = useDispatch()

  const productsTop = useSelector(state=>state.productsTop)
  const {loading, error, products} = productsTop

  useEffect(()=>{
    dispatch(listTopProducts())
  }, [dispatch])

  return (
    loading 
    ? <Loader/>
    : error ? <Message variant='danger'>{error}</Message>
    : (
        <Carousel pause='hover' className='bg-dark'>
            {
                products.map(product => (
                    <Carousel.Item key={product._id}>
                        <Link to={`/products/${product._id}`}>
                            <Image src={product.image} alt={product.name} fluid/>
                            <Carousel.Caption className='carousel-caption'>
                                <h2>{product.name} (¥{product.price})</h2>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ))
            }
        </Carousel>
    )
  )
}

export default ProductsCarousel