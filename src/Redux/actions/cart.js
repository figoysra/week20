export const INSERT_CART = (data) =>{
    return(dispatch) =>{
        const qty = {
            ...data,
            qty: 1,
        };
        dispatch({
            type: "INSERT_CART",
            payload: qty
        })
    }
}
export const DELETE_CART = (id) =>{
    return(dispatch, getState) =>{
        // eslint-disable-next-line array-callback-return
        const newCart= getState().cart.cart.filter((e)=>{
            if(e.id !== id){
                return e
            }
        })
        dispatch({
            type: "REMOVE_CART",
            payload: newCart
        })
    }
}
export const ADD_QTY = (data) =>{
    return(dispatch, getState) =>{
        const cart = getState().cart.cart
        const find = cart.findIndex((e => e.id === data.id))
        cart[find].qty +=1
        dispatch({
            type: "ADD_QTY",
            payload: cart
        })
    }
}
export const REMOVE_QTY = (data) =>{
    return(dispatch, getState) =>{
        const cart = getState().cart.cart
        const find = cart.findIndex((e => e.id === data.id))
        cart[find].qty -=1
        dispatch({
            type: "ADD_QTY",
            payload: cart
        })
    }
}
