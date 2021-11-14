import axios from "axios";
import { API_URL } from "../../Utils/constants";

export const INSERT_TRANSACTION = (form) =>{
    return new Promise((resolve, reject)=>{
        const token = localStorage.getItem('token')
        const headers = {
            token : token
        }
        // console.log(form)
        axios
            .post(`${API_URL}inv`, form, { headers })
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => {
                reject(err);
            });
    })
}
export const GET_TRANSACTION = () =>{
    return (dispatch) =>{
        const token = localStorage.getItem("token");
        const headers = {
            token: token,
        };
        dispatch(allTransactionPending())
        axios.get(`${API_URL}myinv`, {headers})
        .then((response)=>{
            // console.log(response.data)
            dispatch(allTransactionFulfilled(response.data.data));
        })
        .catch((err)=>{
            dispatch(allTransactionRejected())
        })
    }
}

const allTransactionPending= () =>{
    return{
        type : 'GET_ALL_TRANSACTION_PENDING'
    }
}
const allTransactionFulfilled = (payload) =>{
    return{
        type: 'GET_ALL_TRANSACTION_FULFILLED',
        payload
    }
}

const allTransactionRejected = () =>{
    return{
        type: 'GET_ALL_TRANSACTION_REJECTED'
    }
}
// export const GET_TRANSACTION = 