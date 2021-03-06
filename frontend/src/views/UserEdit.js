import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEdit = ({match, history}) => {
  const userId = match.params.id
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const dispatch = useDispatch()

  const userDetails = useSelector((state)=>state.userDetails)
  const {loading, error, user} = userDetails

  const userUpdate = useSelector((state)=>state.userUpdate)
  const {loading: loadingUpdate, error:errorUpdate, success:successUpdate} = userUpdate

  useEffect(()=>{
    if(successUpdate){
        dispatch({type:USER_UPDATE_RESET})
        history.push('/admin/userlist')
    }else{
        if(!user.name || user._id !== userId){
            dispatch(getUserDetails(userId))
        }else{
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }
  }, [dispatch, user, userId, history, successUpdate])

  //表单提交函数
  const submitHandler = (event)=>{
      event.preventDefault()
     dispatch(updateUser({
         _id:userId,
         name,
         email,
         isAdmin
     }))
  }

  return (
    <FormContainer>
        <Link to={`/admin/userlist`} className='btn btn-dark my-3'>Go Back</Link>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader/>}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {
            loading
            ? <Loader/>
            : error
            ? <Message variant='danger'>{error}</Message>
            : (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name: </Form.Label>
                        <Form.Control 
                        type='text' 
                        placeholder='input name' 
                        value={name}
                        onChange={(event)=>setName(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email: </Form.Label>
                        <Form.Control 
                        type='text' 
                        placeholder='input email' 
                        value={email}
                        onChange={(event)=>setEmail(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='isadmin'>
                        <Form.Check
                        type='checkbox' 
                        label='is admin'
                        checked={isAdmin}
                        onChange={(event)=>setIsAdmin(event.target.checked)}
                        />
                    </Form.Group>

                    <Button type='submit' variant='primary'>update</Button>
                </Form>
             )
        }
        
    </FormContainer>
  )
}

export default UserEdit