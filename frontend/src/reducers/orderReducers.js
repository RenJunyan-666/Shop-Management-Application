import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS } from "../constants/orderConstants"

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

