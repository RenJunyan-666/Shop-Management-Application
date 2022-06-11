import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DELLIVER_FAIL, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_MY_FAIL, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from "../constants/orderConstants"
import axios from "axios"
import { logout } from "./userActions"

//创建订单action
export const createOrder = (order) => async (dispatch, getState) =>{
    try {
        dispatch({type:ORDER_CREATE_REQUEST}) //发起请求

        const {userLogin:{userInfo}} = getState() //获取登录成功后的用户信息

        //配置请求中对象格式
        const config = {
            headers:{
                'Content-Type':'application/json', //参数为json对象时设置
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(`/api/orders`, order, config)
        dispatch({type:ORDER_CREATE_SUCCESS, payload:data}) 
    } catch (error) {
        dispatch({
            type:ORDER_CREATE_FAIL, 
            payload:
            error.response 
            && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
}

//获取订单详情action
export const getOrderDetails = (id) => async (dispatch, getState) =>{
    try {
        dispatch({type:ORDER_DETAILS_REQUEST}) //发起请求

        const {userLogin:{userInfo}} = getState() //获取登录成功后的用户信息

        //配置请求中对象格式
        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/orders/${id}`, config)
        dispatch({type:ORDER_DETAILS_SUCCESS, payload:data}) 
    } catch (error) {
        dispatch({
            type:ORDER_DETAILS_FAIL, 
            payload:
            error.response 
            && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
}

//获取所有订单action
export const listOrders = () => async (dispatch, getState) =>{
    try {
        dispatch({type:ORDER_LIST_REQUEST}) //发起请求

        const {userLogin:{userInfo}} = getState() //获取登录成功后的用户信息

        //配置请求中对象格式
        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/orders`, config)
        dispatch({type:ORDER_LIST_SUCCESS, payload:data}) 
    } catch (error) {
        dispatch({
            type:ORDER_LIST_FAIL, 
            payload:
            error.response 
            && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
}

//完成订单支付更新订单的支付状态action
export const payOrder = (orderId, paymentResult) => async (dispatch, getState) =>{
    try {
        dispatch({type:ORDER_PAY_REQUEST}) //发起请求

        const {userLogin:{userInfo}} = getState() //获取登录成功后的用户信息

        //配置请求中对象格式
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)
        dispatch({type:ORDER_PAY_SUCCESS, payload:data}) 
    } catch (error) {
        const message = 
        error.response 
        && error.response.data.message 
        ? error.response.data.message 
        : error.message

        if(message === 'No permission, token validation failed!'){
            dispatch(logout())
        }
        dispatch({
            type:ORDER_PAY_FAIL, 
            payload:message
        })
    }
}

//获取当前登录用户所有订单action
export const listMyOrders = () => async (dispatch, getState) =>{
    try {
        dispatch({type:ORDER_LIST_MY_REQUEST}) //发起请求

        const {userLogin:{userInfo}} = getState() //获取登录成功后的用户信息

        //配置请求中对象格式
        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/orders/myorders`, config)
        dispatch({type:ORDER_LIST_MY_SUCCESS, payload:data}) 
    } catch (error) {
        dispatch({
            type:ORDER_LIST_MY_FAIL, 
            payload:
            error.response 
            && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
}

//完成订单支付更新订单的发货状态action
export const deliverOrder = (order) => async (dispatch, getState) =>{
    try {
        dispatch({type:ORDER_DELIVER_REQUEST}) //发起请求

        const {userLogin:{userInfo}} = getState() //获取登录成功后的用户信息

        //配置请求中对象格式
        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`/api/orders/${order._id}/deliver`, {}, config)
        dispatch({type:ORDER_DELIVER_SUCCESS, payload:data}) 
    } catch (error) {
        const message = 
        error.response 
        && error.response.data.message 
        ? error.response.data.message 
        : error.message

        if(message === 'No permission, token validation failed!'){
            dispatch(logout())
        }
        dispatch({
            type:ORDER_DELLIVER_FAIL, 
            payload:message
        })
    }
}
