const initialState = {
    user : {},
    loadUser: false,
    errorUser : false,
    errorUserMessage: ''
}
const usersReducer = (state=initialState, action) =>{
    switch (action.type) {
        case 'GET_USER_PENDING' :
            return { ...state, loadUser: true}
        case 'GET_USER_FULFILLED' :
            return { ...state, loadUser: false, user: action.payload };
        case 'GET_USER_REJECTED' :
            return {
                ...state,
                loadUser: false,
                errorUser: true,
                errorUserMessage: action.payload,
            };
        default:
            return state;
    }
}
export default usersReducer


