import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from "../constants/orderConstants"
import axios from "axios"

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