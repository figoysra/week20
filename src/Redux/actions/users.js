import axios from 'axios'
import { API_URL } from '../../Utils/constants'

export const ACTION_LOGIN = (form) =>{
    return new Promise ((resolve, reject)=>{
        axios.post(`${API_URL}login`, form)
        .then((response)=>{
            resolve(response.data)
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('idUser', response.data.data.id)
        }).catch((err)=>{
            reject(err)
        })
    })
}

export const REGISTER_USER = (form) =>{
    return new Promise ((resolve,reject)=>{
        axios.post(`${API_URL}register`,form)
        .then((response)=>{
            resolve(response.data)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}

export const USER_DATA = () =>{
    return (dispatch)=>{
        const token = localStorage.getItem('token')
        const id = localStorage.getItem('idUser')
        const headers = {
            token : token
        } 
        dispatch(usersPending())
        axios.get(`${API_URL}users/${id}`,{headers})
        .then((response)=>{
            dispatch(usersFulfilled(response.data.data[0]))
            // console.log(response.data)
            
        }).catch((err)=>{
            dispatch(usersRejected(err))
            // console.log(err)
        })
    }
}
export const UPDATE_USERS = (form) =>{
    return new Promise((resolve, reject)=>{
        const token = localStorage.getItem('token')
        const id = JSON.parse(localStorage.getItem('idUser'))
        const headers = {
            "Content-Type" : "multipart/form-data",
            token : token
        }
        axios.put(`${API_URL}users/${id}`,form, {headers})
        .then((response)=>{
            resolve(response.data)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}

const usersPending = () =>{
    return{
        type : 'GET_USER_PENDING',
    }
}
const usersFulfilled = (payload) =>{
    return{
        type : 'GET_USER_FULFILLED',
        payload
    }
}
const usersRejected = () =>{
    return{
        type : 'GET_USER_REJECTED',
        payload : 'Error'
    }
}