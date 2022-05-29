import axios from "axios";
import { CART_ADD_ITEM, CART_DEL_ITEM } from "../constants/cartConstants";

//添加产品到购物车
export const addToCart = (id, qty) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })

    //购物车信息存储到本地
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

//删除产品从购物车
export const removeFromCart = (id)=> async (dispatch, getState) =>{
    dispatch({
        type: CART_DEL_ITEM,
        payload: id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}