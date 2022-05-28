import {PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_FAIL } from '../constants/productConstants'

// 获取所有产品的reducer
export const productListReducer = (state = {products:[]}, action)=>{
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading:true, products:[]} //请求中
        case PRODUCT_LIST_SUCCESS:
            return {loading:false, products: action.payload} //请求成功
        case PRODUCT_LIST_FAIL:
            return {loading:false, error: action.payload} //请求失败
        default:
            return state
    }
}

// 获取单个产品的reducer
export const productDetailsReducer = (state = {product:{}}, action)=>{
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {loading:true, ...state} //请求中
        case PRODUCT_DETAILS_SUCCESS:
            return {loading:false, product: action.payload} //请求成功
        case PRODUCT_DETAILS_FAIL:
            return {loading:false, error: action.payload} //请求失败
        default:
            return state
    }
}