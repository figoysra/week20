const initialState =  {
    cart : []
}
const cartReducer = (state = initialState, action) =>{
    switch (action.type) {
        case "INSERT_CART":
            return {cart: [...state.cart, action.payload]}
        case "REMOVE_CART":
            return  {cart : action.payload}
        case "ADD_QTY":
            return  {cart : action.payload}
        case "REMOVE_QTY":
            return  {cart : action.payload}
        case 'RESET_CART' : 
            return {...state, cart : []}
        default:
            return state 
        }
}
export default cartReducer