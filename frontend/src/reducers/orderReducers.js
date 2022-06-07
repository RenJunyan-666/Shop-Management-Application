import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS } from "../constants/orderConstants"

// 创建订单reducer
export const orderCreateReducer = (state = {}, action)=>{
    switch(action.type){
        case ORDER_CREATE_REQUEST:
            return {loading:true} //请求中
        case ORDER_CREATE_SUCCESS:
            return {loading:false, order: action.payload, success:true} //请求成功，获得订单详情
        case ORDER_CREATE_FAIL:
            return {loading:false, error: action.payload} //请求失败
        default:
            return state
    }
}

// 获取订单详情reducer
export const orderDetailsReducer = (state = { //初始化中有内容则下方返回对象中添加当前state
    orderItems:[],
    shippingAddress:{},
    loading:true
}, action)=>{
    switch(action.type){
        case ORDER_DETAILS_REQUEST:
            return {...state, loading:true} //请求中
        case ORDER_DETAILS_SUCCESS:
            return {loading:false, order: action.payload} //请求成功，获得订单详情
        case ORDER_DETAILS_FAIL:
            return {loading:false, error: action.payload} //请求失败
        default:
            return state
    }
}

// 获取所有订单reducer
export const orderListReducer = (state = {orders:[]}, action)=>{
    switch(action.type){
        case ORDER_LIST_REQUEST:
            return {loading:true} //请求中
        case ORDER_LIST_SUCCESS:
            return {loading:false, orders: action.payload} //请求成功，获得订单详情
        case ORDER_LIST_FAIL:
            return {loading:false, error: action.payload} //请求失败
        default:
            return state
    }
}

