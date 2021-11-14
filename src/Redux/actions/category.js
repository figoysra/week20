import axios from 'axios'
import { API_URL } from '../../Utils/constants'

export const ACTION_GET_ALL_CATEGORY = () =>{
    return (dispatch) =>{
        dispatch(allCategoryPending())
        axios.get(`${API_URL}cat`)
        .then((response)=>{
            dispatch(allCategoryFulfilled(response.data.data.data));
        })
        .catch((err)=>{
            dispatch(allCategoryRejected())
        })
    }
}

const allCategoryPending = () =>{
    return{
        type : 'GET_ALL_CATEGORY_PENDING',
    }
}
const allCategoryFulfilled = (payload) =>{
    return{
        type : 'GET_ALL_CATEGORY_FULFILLED',
        payload
    }
}
const allCategoryRejected = () =>{
    return{
        type : 'GET_ALL_CATEGORY_REJECTED',
        payload : 'Error'
    }
}

