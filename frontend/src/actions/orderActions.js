import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS } from "../constants/orderConstants"
import axios from "axios"

//创建订单action
export const createOrder = (order) => async (dispatch, getState) =>{
    try {
        dispatch({type:ORDER_CREATE_REQUEST}) //发起请求

        const {userLogin:{userInfo}} = getState() //获取登录成功后的用户信息

        //配置请求中对象格式
        const config = {
            headers:{
                'Content-Type':'application/json',
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