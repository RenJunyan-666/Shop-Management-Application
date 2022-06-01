import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_RESET, USER_UPDATE_PROFILE_SUCCESS } from "../constants/userConstants"

// 用户登录reducer
export const userLoginReducer = (state = {}, action)=>{
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return {loading:true} //请求中
        case USER_LOGIN_SUCCESS:
            return {loading:false, userInfo: action.payload} //请求成功，获得该用户信息
        case USER_LOGIN_FAIL:
            return {loading:false, error: action.payload} //请求失败
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

// 用户注册reducer
export const userRegisterReducer = (state = {}, action)=>{
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {loading:true} //请求中
        case USER_REGISTER_SUCCESS:
            return {loading:false, userInfo: action.payload} //请求成功，获得该用户信息
        case USER_REGISTER_FAIL:
            return {loading:false, error: action.payload} //请求失败
        default:
            return state
    }
}

// 用户详情reducer
export const userDetailsReducer = (state = {user:{}}, action)=>{
    switch(action.type){
        case USER_DETAILS_REQUEST:
            return {loading:true, ...state} //请求中
        case USER_DETAILS_SUCCESS:
            return {loading:false, user: action.payload} //请求成功，获得该用户信息
        case USER_DETAILS_FAIL:
            return {loading:false, error: action.payload} //请求失败
        default:
            return state
    }
}

// 更新用户信息reducer
export const userUpdateProfileReducer = (state = {}, action)=>{
    switch(action.type){
        case USER_UPDATE_PROFILE_REQUEST:
            return {loading:true} //请求中
        case USER_UPDATE_PROFILE_SUCCESS:
            return {loading:false, userInfo: action.payload, success:true} //请求成功，获得该用户信息
        case USER_UPDATE_PROFILE_FAIL:
            return {loading:false, error: action.payload} //请求失败
        case USER_UPDATE_PROFILE_RESET:
            return {}
        default:
            return state
    }
}