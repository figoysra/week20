const initialState = {
    data : [],
    loadData : false,
    errorData:  false,
    errorDataMessage: ''
}

const productTransaction = (state=initialState, action) =>{
    switch (action.type) {
        case 'GET_PRODUCT_TRANSACTION_PENDING' :
            return { ...state, loadData: true}
        case 'GET_PRODUCT_TRANSACTION_FULFILLED':
            return { ...state, loadData: false, data: action.payload}
        case 'GET_PRODUCT_TRANSACTION_REJECTED' :
            return {...state, loadData: false, errorData: true, errorDataMessage: action.payload}
        default:
            return state;
    }
}
export default productTransaction