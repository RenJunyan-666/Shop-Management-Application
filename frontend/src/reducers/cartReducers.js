import { CART_ADD_ITEM, CART_CLEAR_ITEM, CART_DEL_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants"

export const cartReducer = (state = {
    cartItems: [],
    shippingAddress:{},
    paymentMethod: ''
}, action)=>{
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload
            //find函数：当数组中的元素在测试条件时返回 true 时, find() 返回符合条件的元素，之后的值不会再调用执行函数
            const existItem = state.cartItems.find(x => x.product === item.product) //判断是否购物车内已存在该产品
            if(existItem){ //替换现有产品
                return {
                    ...state,
                    cartItems:state.cartItems.map(x => 
                        x.product === existItem.product ? item : x)
                }
            }else{ //新添加该产品
                return {
                    ...state,
                    cartItems:[...state.cartItems, item]
                }
            }
        case CART_DEL_ITEM:
            return {...state, cartItems:state.cartItems.filter(x => x.product !== action.payload)}
        case CART_CLEAR_ITEM:
            return {...state, cartItems:[]}
        case CART_SAVE_SHIPPING_ADDRESS:
            return {...state, shippingAddress:action.payload}
        case CART_SAVE_PAYMENT_METHOD:
            return {...state, paymentMethod:action.payload}
        default:
            return state
    }
}