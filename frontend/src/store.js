import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productListReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer
}) 

//获取本地购物车信息
const cartItemsFromStorage = localStorage.getItem('cartItems')
 ? JSON.parse(localStorage.getItem('cartItems'))
 : []

const initialState = {
    cart:{ cartItems: cartItemsFromStorage}
} //初始状态

const middleware = [thunk] //中间件

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store