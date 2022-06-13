import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const SearchBox = ({history}) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (event)=>{
    event.preventDefault()
    if(keyword.trim()){ //去掉首位空格
        history.push(`/search/${keyword}`)
    }else{
        history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline='true'>
        <Form.Control 
        type='text' 
        name='q' 
        onChange={event=>setKeyword(event.target.value)}
        placeholder='search product...'
        className='mr-sm-2 ml-sm-5'/>
        <Button type='submit' variant='outline-success' className='p-2'>Search</Button>
    </Form>
  )
}

export default SearchBox