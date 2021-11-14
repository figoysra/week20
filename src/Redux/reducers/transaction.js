const initialState = {
    transaction: [],
    loadAll : false,
    errorAll : false,
    errorAllMessage: '',
}
const transactionReducer = (state= initialState, action) =>{
    switch (action.type) {
        case 'GET_ALL_TRANSACTION_PENDING' :
            return { ...state, loadAll: true}
        case 'GET_ALL_TRANSACTION_FULFILLED' :
            return {...state, loadAll : false, transaction : action.payload}
        case 'GET_ALL_TRANSACTION_REJECTED' :
            return {...state,loadAll : false, errorAll: true, errorAllMessage: action.payload}
    
        default:
            return state;
    }
}
export default transactionReducer