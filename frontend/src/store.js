import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productCreateReducer, productDeleteReducer, productDetailsReducer, productListReducer, productReviewCreateReducer, productsTopReducer, productUpdateReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { userDeleteReducer, userDetailsReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer, userUpdateReducer } from "./reducers/userReducers";
import { orderCreateReducer, orderDeliverReducer, orderDetailsReducer, orderListMyReducer, orderListReducer, orderPayReducer } from "./reducers/orderReducers";

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productsTop:productsTopReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderList: orderListReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderDeliver: orderDeliverReducer
}) 

//获取本地购物车信息
const cartItemsFromStorage = localStorage.getItem('cartItems')
 ? JSON.parse(localStorage.getItem('cartItems'))
 : []

//获取本地登录用户信息
const userInfoFromStorage = localStorage.getItem('userInfo')
 ? JSON.parse(localStorage.getItem('userInfo'))
 : null

//获取本地存储多用户地址信息
const shippingAddressStorage = localStorage.getItem('shippingAddress')
 ? JSON.parse(localStorage.getItem('shippingAddress'))
 : {}

//获取本地存储多用户地址信息
const paymentMethodStorage = localStorage.getItem('paymentMethod')
 ? JSON.parse(localStorage.getItem('paymentMethod'))
 : 'wechat'

const initialState = {
    cart:{ 
        cartItems: cartItemsFromStorage, 
        shippingAddress: shippingAddressStorage,
        paymentMethod: paymentMethodStorage
    },
    userLogin:{ userInfo: userInfoFromStorage}
} //初始状态

const middleware = [thunk] //中间件

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store