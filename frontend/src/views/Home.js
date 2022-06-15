import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Product from '../components/Product'
import {Row, Col} from 'react-bootstrap'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductsCarousel from '../components/ProductsCarousel'
import Meta from '../components/Meta'
import { Link } from 'react-router-dom'

const Home = ({match}) => {
  const dispatch = useDispatch() //派发请求数据的action函数
  const productList = useSelector(state => state.productList)
  const {loading, error, products, pages, page} = productList
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  useEffect(()=>{
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return <>
    <Meta/>
    {
      !keyword ? <ProductsCarousel/> : <Link to='/' className='btn btn-dark'>Back</Link>
    }
    <h1>New Products</h1>
    {loading 
    ? <Loader/> 
    : error 
    ? <Message variant='danger'>{error}</Message> 
    : (
      <>
        <Row>
          { products.map(product=>(
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product}/>
            </Col>))
          }
        </Row>
        <Paginate
        pages={pages}
        page={page}
        keyword={keyword?keyword:''}/>
      </>
    )}
    
  </>
}

export default Home