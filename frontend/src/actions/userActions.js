import { USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_RESET, USER_LIST_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../constants/userConstants"
import axios from 'axios'

//用户登录action
export const login = (email, password) => async (dispatch) =>{
    try {
        dispatch({type:USER_LOGIN_REQUEST}) //发起请求

        //配置请求中对象格式
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }

        const {data} = await axios.post(
            '/api/users/login', 
            {email, password},
            config
        )
        //i请求成功，拿到用户信息并存储在localstorage中
        dispatch({type:USER_LOGIN_SUCCESS, payload:data})
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type:USER_LOGIN_FAIL, 
            payload:
            error.response 
            && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
}

//用户退出action
export const logout = ()=>(dispatch)=>{
    localStorage.removeItem('userInfo')
    dispatch({type:USER_LOGOUT})
    dispatch({type:USER_LIST_RESET})
}

//用户注册action
export const register = (name, email, password) => async (dispatch) =>{
    try {
        dispatch({type:USER_REGISTER_REQUEST}) //发起请求

        //配置请求中对象格式
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }

        const {data} = await axios.post(
            '/api/users', 
            {name, email, password},
            config
        )
        //注册并登录成功成功，拿到用户信息并存储在localstorage中
        dispatch({type:USER_REGISTER_SUCCESS, payload:data})
        dispatch({type:USER_LOGIN_SUCCESS, payload:data})
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type:USER_REGISTER_FAIL, 
            payload:
            error.response 
            && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
}

//用户详情action
export const getUserDetails = (id) => async (dispatch, getState) =>{
    try {
        dispatch({type:USER_DETAILS_REQUEST}) //发起请求

        const {userLogin:{userInfo}} = getState() //获取登录成功后的用户信息

        //配置请求中对象格式
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/users/${id}`, config)
        dispatch({type:USER_DETAILS_SUCCESS, payload:data}) //显示用户详情
    } catch (error) {
        dispatch({
            type:USER_DETAILS_FAIL, 
            payload:
            error.response 
            && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
}

//更新用户详情action
export const updateUserProfile = (user) => async (dispatch, getState) =>{
    try {
        dispatch({type:USER_UPDATE_PROFILE_REQUEST}) //发起请求

        const {userLogin:{userInfo}} = getState() //获取登录成功后的用户信息

        //配置请求中对象格式
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`/api/users/profile`, user, config)
        dispatch({type:USER_UPDATE_PROFILE_SUCCESS, payload:data}) //更新用户详情
        dispatch({type:USER_LOGIN_SUCCESS, payload:data}) //更新当前登录用户信息
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type:USER_UPDATE_PROFILE_FAIL, 
            payload:
            error.response 
            && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
}

//用户列表action
export const listUsers = () => async (dispatch, getState) =>{
    try {
        dispatch({type:USER_LIST_REQUEST}) //发起请求

        const {userLogin:{userInfo}} = getState() //获取登录成功后的用户信息

        //配置请求中对象格式
        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/users`, config)
        dispatch({type:USER_LIST_SUCCESS, payload:data}) //显示用户列表
    } catch (error) {
        dispatch({
            type:USER_LIST_FAIL, 
            payload:
            error.response 
            && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
}

//删除用户action
export const deleteUser = (id) => async (dispatch, getState) =>{
    try {
        dispatch({type:USER_DELETE_REQUEST}) //发起请求

        const {userLogin:{userInfo}} = getState() //获取登录成功后的用户信息

        //配置请求中对象格式
        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/users/${id}`, config)
        dispatch({type:USER_DELETE_SUCCESS }) //删除用户
    } catch (error) {
        dispatch({
            type:USER_DELETE_FAIL, 
            payload:
            error.response 
            && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
}

//更新用户action
export const updateUser = (user) => async (dispatch, getState) =>{
    try {
        dispatch({type:USER_UPDATE_REQUEST}) //发起请求

        const {userLogin:{userInfo}} = getState() //获取登录成功后的用户信息

        //配置请求中对象格式
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`/api/users/${user._id}`,user, config)
        dispatch({type:USER_UPDATE_SUCCESS }) //更新用户
        dispatch({type:USER_DETAILS_SUCCESS, payload:data}) //获取用户详情
    } catch (error) {
        dispatch({
            type:USER_UPDATE_FAIL, 
            payload:
            error.response 
            && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
}