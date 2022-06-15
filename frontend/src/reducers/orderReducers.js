import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_RESET, ORDER_CREATE_SUCCESS, ORDER_DELIVER_REQUEST, ORDER_DELIVER_RESET, ORDER_DELIVER_SUCCESS, ORDER_DELLIVER_FAIL, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_MY_FAIL, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_RESET, ORDER_LIST_MY_SUCCESS, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESS } from "../constants/orderConstants"

// 创建订单reducer
export const orderCreateReducer = (state = {}, action)=>{
    switch(action.type){
        case ORDER_CREATE_REQUEST:
            return {loading:true} //请求中
        case ORDER_CREATE_SUCCESS:
            return {loading:false, order: action.payload, success:true} //请求成功，获得订单详情
        case ORDER_CREATE_FAIL:
            return {loading:false, error: action.payload} //请求失败
        case ORDER_CREATE_RESET:
            return {}
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

// 订单支付更新订单的付款状态reducer
export const orderPayReducer = (state = {}, action)=>{
    switch(action.type){
        case ORDER_PAY_REQUEST:
            return {loading:true} //请求中
        case ORDER_PAY_SUCCESS:
            return {loading:false, success:true} //请求成功，成功修改订单为下单订单
        case ORDER_PAY_FAIL:
            return {loading:false, error: action.payload} //请求失败
        case ORDER_PAY_RESET:
            return {}
        default:
            return state
    }
}

// 获取登录用户订单的reducer
export const orderListMyReducer = (state = { orders: []}, action)=>{
    switch(action.type){
        case ORDER_LIST_MY_REQUEST:
            return {loading:true} //请求中
        case ORDER_LIST_MY_SUCCESS:
            return {loading:false, orders: action.payload} //请求成功，获取当前用户的所有订单
        case ORDER_LIST_MY_FAIL:
            return {loading:false, error: action.payload} //请求失败
        case ORDER_LIST_MY_RESET:
            return {orders:[]}
        default:
            return state
    }
}

// 更新订单的发货状态的reducer
export const orderDeliverReducer = (state = {}, action)=>{
    switch(action.type){
        case ORDER_DELIVER_REQUEST:
            return {loading:true} //请求中
        case ORDER_DELIVER_SUCCESS:
            return {loading:false, success:true} //请求成功，更新订单的发货状态
        case ORDER_DELLIVER_FAIL:
            return {loading:false, error: action.payload} //请求失败
        case ORDER_DELIVER_RESET:
            return {}
        default:
            return state
    }
}

