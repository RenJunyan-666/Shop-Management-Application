import React from 'react'
import {Nav} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({step1, step2, step3, step4}) => {
  return (
    <Nav className='justify-content-center mb-4'>
        {/* 第一步判断是否登录 */}
        <Nav.Item>
            {
                step1 
                ? (<LinkContainer to='/login'>
                    <Nav.Link>Login</Nav.Link>
                </LinkContainer>)
                : (<Nav.Link disabled>
                    Login
                </Nav.Link>)
            }
        </Nav.Item>

        {/* 第二步进入地址填写 */}
        <Nav.Item>
            {
                step2
                ? (<LinkContainer to='/shipping'>
                    <Nav.Link>Address</Nav.Link>
                </LinkContainer>)
                : (<Nav.Link disabled>
                    Address
                </Nav.Link>)
            }
        </Nav.Item>

        {/* 第三步进入支付步骤 */}
        <Nav.Item>
            {
                step3
                ? (<LinkContainer to='/payment'>
                    <Nav.Link>Payment</Nav.Link>
                </LinkContainer>)
                : (<Nav.Link disabled>
                    Payment
                </Nav.Link>)
            }
        </Nav.Item>

        {/* 第四步确认下单 */}
        <Nav.Item>
            {
                step4
                ? (<LinkContainer to='/placeorder'>
                    <Nav.Link>Place Order</Nav.Link>
                </LinkContainer>)
                : (<Nav.Link disabled>
                    Place Order
                </Nav.Link>)
            }
        </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps