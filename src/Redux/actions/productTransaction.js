import axios from "axios";
import { API_URL } from "../../Utils/constants";

export const GET_PRODUCT_TRANSACTION = (data) =>{
    return (dispatch) =>{
        const token = localStorage.getItem('token')
        const headers = {
            token : token
        }
        console.log(data);
        dispatch({
            type: "GET_PRODUCT_TRANSACTION_PENDING"
        })
        axios.get(`${API_URL}myproducts/${data}`,{headers})
        .then((response)=>{
            console.log(response.data.data)
            dispatch({
                type: "GET_PRODUCT_TRANSACTION_FULFILLED",
                payload : response.data.data
            })
        }).catch((err)=>{
            dispatch({
                type: "GET_PRODUCT_TRANSACTION_REJECTED",
                err
            })
        })
        
        
    }
}