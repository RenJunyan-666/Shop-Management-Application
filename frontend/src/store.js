import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productListReducer } from "./reducers/productReducers";

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer
}) 

const initialState = {} //初始状态

const middleware = [thunk] //中间件

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store