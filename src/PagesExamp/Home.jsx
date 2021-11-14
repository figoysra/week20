import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ACTION_GET_ALL_PRODUCTS, INSERT_PRODUCTS } from "../Redux/actions/products";

const Home = () =>{
    const dispatch = useDispatch()
    const products = useSelector(state =>state.products)
    const [form, setForm] = useState({
        productsName : '',
        photo: '',
        price : '',
        description: '',
        categoryID : ''
    })
    const getDataProducts = () =>{
        dispatch(ACTION_GET_ALL_PRODUCTS())
    }
    useEffect(()=>{
        getDataProducts()
    },[])
    const handleSubmit =  () =>{
        INSERT_PRODUCTS().then((response)=>{
            getDataProducts()
        }).catch((err)=>{
            alert(err)
        })
    }
    return(
        <div>
            Hello World
            {/* {
                products.loadAll ? (
                    <h1>Load ...</h1>
                ):(
                products.all.map((e,i)=>{
                    <div key={i}>
                        {e.productName}
                    </div>
                })
                )
            } */}
            {JSON.stringify(products)}
            <form>
                <input type="text" name="productsName" value="" />
                <input type="text" name="]" value="" />
                <input type="file" name="description" value="" />
                <input type="text" name="categoryID" value="" />
                <button type="">Add Data</button>
            </form>
        </div>
    )
}
export default Home