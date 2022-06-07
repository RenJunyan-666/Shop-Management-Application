import {PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_RESET, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_RESET } from '../constants/productConstants'

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

// 删除单个产品的reducer
export const productDeleteReducer = (state = {}, action)=>{
    switch(action.type){
        case PRODUCT_DELETE_REQUEST:
            return {loading:true} //请求中
        case PRODUCT_DELETE_SUCCESS:
            return {loading:false, success:true} //请求成功
        case PRODUCT_DELETE_FAIL:
            return {loading:false, error: action.payload} //请求失败
        default:
            return state
    }
}

// 创建产品的reducer
export const productCreateReducer = (state = {}, action)=>{
    switch(action.type){
        case PRODUCT_CREATE_REQUEST:
            return {loading:true} //请求中
        case PRODUCT_CREATE_SUCCESS:
            return {loading:false, success:true, product:action.payload} //请求成功
        case PRODUCT_CREATE_FAIL:
            return {loading:false, error: action.payload} //请求失败
        case PRODUCT_CREATE_RESET:
            return {} //重置
        default:
            return state
    }
}

// 更新产品的reducer
export const productUpdateReducer = (state = {product:{}}, action)=>{
    switch(action.type){
        case PRODUCT_UPDATE_REQUEST:
            return {loading:true} //请求中
        case PRODUCT_UPDATE_SUCCESS:
            return {loading:false, success:true, product:action.payload} //请求成功
        case PRODUCT_UPDATE_FAIL:
            return {loading:false, error: action.payload} //请求失败
        case PRODUCT_UPDATE_RESET:
            return {product:{}} //重置
        default:
            return state
    }
}