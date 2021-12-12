import axios from 'axios'
import { API_URL } from '../../Utils/constants'

export const INSERT_PRODUCTS = (form) =>{
    // console.log(token)
    return new Promise ((resolve,reject)=>{
        const token = localStorage.getItem("token");
        // console.log(token);
        const headers = {
            "Content-Type" : "multipart/form-data",
            token : token
        }
        axios.post(`${API_URL}products`,form, {headers})
        .then((response)=>{
            // console.log(response.data)
            resolve(response.data)
        }).catch((err)=>{
            // console.log(err)
            reject(err)
        })
    })
}

export const UPDATE_PRODUCT = (id,form,token) =>{
    return new Promise ((resolve,reject)=>{
        const headers = {
            "Content-Type" : "multipart/form-data",
            token : token
        }
        // console.log(id)
        axios.put(`${API_URL}products/${id}`,form, {headers})
        .then((response)=>{
            // console.log(response.data)
            resolve(response.data)
        }).catch((err)=>{
            console.log(err)
            reject(err)
        })
    })
}

export const SEARCH_PRODUCT = (search) =>{
    return (dispatch)=>{
        axios.get(`${API_URL}products?search=${search}`)
        .then((response)=>{
            dispatch(allProductsFulfilled(response.data.data))
        })
        .catch((err)=>{
            dispatch(allProductsRejected)
        })
    }
}
export const ACTION_GET_ALL_PRODUCTS = () =>{
    return (dispatch) =>{
        dispatch(allProductsPending())
        axios.get(`${API_URL}products`)
        .then((response)=>{
            console.log(response.data.data)
            dispatch(allProductsFulfilled(response.data.data));
        })
        .catch((err)=>{
            dispatch(allProductsRejected())
        })
    }
}

export const DETAIL_PRODUCT = (id) =>{
    return (dispatch) =>{
        dispatch(detailPending())
        axios.get(`${API_URL}products/${id}`)
        .then((response)=>{
            // console.log()
            dispatch(detailFulfilled(response.data.data));
        })
        .catch((err)=>{
            dispatch(detailRejected(err.response))
            // console.log(err)
        })
    }
}

export const DELETE_PRODUCT = (id, token) =>{
    // console.log(id)
    return new Promise ((resolve, reject)=>{
        const headers = {
            token : token
        }
        axios.delete(`${API_URL}products/${id}`, {headers})
        .then((response)=>{
            // console.log(response.data)
            resolve(response.data)
        }).catch((err)=>{
            // console.log(err)
            reject(err)
        })
    })
}

export const HANDLEPAGINATION = (query)=>{
    const {page} = query
    return(dispatch)=>{
        dispatch(allProductsPending());
        axios.get(`${API_URL}products?page=${page}`)
        .then((response)=>{
            dispatch(allProductsFulfilled(response.data.data))
        })
        .catch((err)=>{
            dispatch(allProductsRejected)
        })
    }
}


const allProductsPending = () =>{
    return{
        type : 'GET_ALL_PRODUCTS_PENDING',
    }
}
const allProductsFulfilled = (payload) =>{
    return{
        type : 'GET_ALL_PRODUCTS_FULFILLED',
        payload
    }
}
const allProductsRejected = () =>{
    return{
        type : 'GET_ALL_PRODUCTS_REJECTED',
        payload : 'Error'
    }
}




const detailPending = () =>{
    return{
        type: 'GET_DETAIL_PRODUCT_PENDING'
    }
}

const detailFulfilled = (payload) =>{
    return{
        type: 'GET_DETAIL_PRODUCT_FULFILLED',
        payload
    }
}

const detailRejected = (payload) =>{
    return{
        type: 'GET_DETAIL_PRODUCT_REJECTED',
        payload
    }
}