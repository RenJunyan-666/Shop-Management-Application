import React, { useEffect } from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button, Row, Col } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { deleteProduct, listProducts, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import Paginate from '../components/Paginate'

const ProductList = ({history, match}) => {
  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const {loading, error, products, pages, page} = productList

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const productDelete = useSelector(state=>state.productDelete)
  const {loading:loadingDelete, error:errorDelete, success:successDelete} = productDelete

  const productCreate = useSelector(state=>state.productCreate)
  const {loading:loadingCreate, error:errorCreate, success:successCreate, product:createdProduct} = productCreate

  useEffect(()=>{
    dispatch({type:PRODUCT_CREATE_RESET})
    
    if(!userInfo.isAdmin){
        history.push('/login')
    }

    if(successCreate){ //已经创建好样本产品，直接跳转到编辑页面
        history.push(`/admin/product/${createdProduct._id}/edit`)
    }else{ //默认展示所有产品
        dispatch(listProducts('', pageNumber))
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, pageNumber])

  //删除产品函数
  const deleteHandler = (id)=>{
      if(window.confirm('Are you sure?')){
          dispatch(deleteProduct(id))
      }
  }

  //创建产品函数
  const createProductHandler = ()=>{
      dispatch(createProduct())
  }

  return (
    <>
        <Row>
            <Col>
                <h1>Product List</h1>
            </Col>
            <Col className='text-right'>
                <Button className='my-3' onClick={createProductHandler}>create product</Button>
            </Col>
        </Row>
        {loadingCreate && <Loader/>}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {loadingDelete && <Loader/>}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        {
            loading 
            ? <Loader/> 
            : error 
            ? <Message variant='danger'>{error}</Message>
            : (
                <>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>product name</th>
                                <th>price</th>
                                <th>category</th>
                                <th>brand</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product=>(
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(product._id)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate
                    page={page}
                    pages={pages}
                    isAdmin={true}/>
                </>
            )
        }
    </>
  )
}

export default ProductList