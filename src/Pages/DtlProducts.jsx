/* eslint-disable array-callback-return */
import { useHistory, useParams } from 'react-router-dom'
import Footer from '../Components/Footer'
import Nav from '../Components/Nav'
import { Container, Row, Col,Input,Button, Form, Label, Modal, ModalHeader, ModalBody, } from 'reactstrap'
import { useEffect, useState } from 'react'
import { UPDATE_PRODUCT, DELETE_PRODUCT } from '../Redux/actions/products'
import { ACTION_GET_ALL_CATEGORY } from '../Redux/actions/category'
import {API_URL} from '../Utils/constants'
import { useSelector,useDispatch } from "react-redux";
import { DETAIL_PRODUCT } from '../Redux/actions/products'
import { USER_DATA } from '../Redux/actions/users'
import { INSERT_CART, DELETE_CART, ADD_QTY, REMOVE_QTY } from '../Redux/actions/cart'
import CurrencyFormat from "react-currency-format";
import './details.css'

const Details = () =>{
    const  { id } = useParams()
    const idProduct = parseInt(id)
    const loginStatus = localStorage.getItem("token");
    const history = useHistory()
    const dispatch = useDispatch()
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const dataProducts = useSelector(state =>state.products)
    const category = useSelector((state) => state.category);
    const user = useSelector((state) => state.users);
    const cart = useSelector(store => store.cart)

    const [inputProducts, setInputProducts] = useState({
        productName : '',
        photo : '',
        price: '',
        description: '',
        categoryID : '1',
        photoPriview: ''
    })
    // const [category,setCategory]  = useState()
    
    const changeText = (e) =>{
        setInputProducts({
            ...inputProducts,
            [e.target.name] : e.target.value
        })
    }
    const changeInputFile = (e) =>{
        setInputProducts({
            ...inputProducts,
            photo : e.target.files[0],
            photoPriview: URL.createObjectURL(e.target.files[0])
        })
    }
    

    const getdetailCategory = () =>{
        dispatch(ACTION_GET_ALL_CATEGORY());
    }

    const getdetailData = () =>{
        dispatch(DETAIL_PRODUCT(id))
    }
    const getDataUser = () =>{
        dispatch(USER_DATA())
    }
    
    const deleteData = () =>{
        DELETE_PRODUCT(id,loginStatus)
        .then((response)=>{
            console.log(response)
            alert(response.message)
            history.push("/products");
        }).catch((error)=>{
            alert(`${error.message} Cannot Delete Data
            Please Call Admin in 021-082`);
        })
    }
    useEffect(() => {
        getdetailCategory()
        getdetailData()
        getDataUser()
        // dataProduct()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        setInputProducts({
            productName: dataProducts.detail.productName,
            photo: dataProducts.detail.photo,
            price: dataProducts.detail.price,
            description: dataProducts.detail.description,
            categoryID: dataProducts.detail.categoryID
        });
    }, [dataProducts.detail]);
    

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(inputProducts)
        const formData = new FormData()
        formData.append("productName", inputProducts.productName);
        formData.append("photo", inputProducts.photo);
        formData.append("price", inputProducts.price);
        formData.append("description", inputProducts.description);
        formData.append("categoryID", inputProducts.categoryID);
        UPDATE_PRODUCT(id, formData, loginStatus)
        .then((res)=>{
            alert('Update Berhasil')
            getdetailData()
        }).catch((err)=>{
            // console.log(err)
            alert('Cannot Update Data')
        })
        
    }
    const addQty = (product) =>{
        dispatch(ADD_QTY(product))
        // const find = cart.cart.findIndex((e=> e.id === product.id))
        // cart.cart[find].qty +=1
    }
    const btnRemove = (product) =>{
        const find = cart.cart.findIndex((e) => e.id === product.id);
        cart.cart[find].qty <= 1 ? (
            dispatch(DELETE_CART(product))
        ):(dispatch(REMOVE_QTY(product)))
    }

    const handleCart = (product)=>{
        // console.log(product)
        // eslint-disable-next-line array-callback-return
        const find = cart.cart.find((e)=>{
            if(e.id === product.id){
                return e
            }
        })
        if(find === undefined){
            // const qty = {
            //     ...product, qty : 1
            // }
            dispatch(INSERT_CART(product));
        }else{
            addQty(product)
        }
    } 
    // console.log(idProduct)
    
    return(
        <div>
            <Nav token={loginStatus} />
            <div className='rubik mb-4  pt-5 mb-5'>
                <Container>
                    <Row>
                        <Col lg = '4' md='6' sm='12' className='detailSide'>
                            <p>Favorite & Promo <span className='text-capitalize fontBrown fw-bolder'> {'>'} {dataProducts.detail.productName}</span> </p>
                            <div className='d-flex flex-column align-items-center'>
                                <div className='detailImage '>
                                    <img src={`${API_URL}${dataProducts.detail.photo}`} alt="" />
                                </div>
                                <div className='detailTitle mt-4 d-flex flex-column align-items-center'>
                                    <h1 className='text-capitalize'>{dataProducts.detail.productName}</h1>
                                    <p>
                                        <CurrencyFormat value={dataProducts.detail.price} displayType={'text'} thousandSeparator={true} prefix={'IDR '} />
                                    </p>
                                </div>
                                {user.user.admin === 0 || user.user.admin === undefined ? (
                                    <>
                                        <Button className='btn w-100 btnAction brown fontWhite  mb-2' onClick={()=>handleCart(dataProducts.detail)}>Add to Cart</Button>
                                        <Button className='btn w-100 btnAction yellow fontBrown  mb-2'>Ask a Staff</Button>
                                    </>
                                ):(
                                    <div>
                                        <Button onClick={toggle} className='btn w-100 btnAction brown fontWhite  mb-2'> Edit Data </Button>
                                        <Button className='btn w-100 btnAction yellow fontBrown  mb-2' onClick={deleteData}> Delete Data </Button>
                                    </div>
                                )}
                                
                                <Modal isOpen={modal} toggle={toggle} >
                                    <ModalHeader toggle={toggle}>Edit Product</ModalHeader>
                                    <ModalBody>
                                        <Form onSubmit={handleSubmit} >
                                            <Label for="">Products</Label> 
                                            <Input type="text" value={inputProducts.productName}  onChange={changeText} name="productName" placeholder="" /><br/>
                                            <Label for="" >Image</Label><br />
                                            <Input type="file"  onChange={changeInputFile}   name="photo" placeholder="" /><br/>
                                            <img  width='auto' height='100px' src={inputProducts.photoPriview} alt="" /> <br />
                                            <Label for="">Price</Label> 
                                            <Input type="number" onChange={changeText} name="price" value={inputProducts.price} placeholder="" /><br/>
                                            <Label for="" >Description</Label>
                                            <Input type="textarea" name="description" onChange={changeText} value={inputProducts.description}  /><br />
                                            <Label for="" >Category</Label>
                                            <select type="select" name="categoryID" value={inputProducts.categoryID} id="exampleSelect" className='p-2 w-100' 
                                                onChange={changeText}>
                                                    {
                                                        category.all.map((e, i)=>{
                                                            return(
                                                                <option key={i} value={e.id} selected={e.id === inputProducts.categoryID ? true : false}>{e.category}</option>
                                                            )
                                                        })
                                                    }
                                            </select><br />
                                            <Button type='submit' className='w-100 m-2 btn btnUpdateCart' onClick={toggle}>Update Data</Button><br />
                                            <Button className='w-100 m-2 btn btnCancelUpdate' onClick={toggle}>Cancel</Button>
                                        </Form>
                                    </ModalBody>
                                </Modal>
                                
                                {/* <Button className='btn w-100 btnAction black fontWhite mb-2'>Add to Cart</Button> */}
                            </div>

                            {/* <div className='detailImage rubik '>
                                <img src={`${API_URL}${dataProducts.detail.photo}`} alt="" width='100%' height='auto' />
                                <p className='mt-4'>Delivery only on 
                                    <span className='fw-bold '> Monday to friday at  1 - 7 pm</span> </p>
                                {user.user.admin !== 0 && user.user.admin !== undefined ? (
                                    <div>
                                        <Button onClick={toggle} className='w-100 btn  bgyellow fw-bold btnDetail m-2'> Edit Data </Button>
                                        <Button className='w-100 btn btn-danger m-2 mb-5' onClick={deleteData}> Delete Data </Button>
                                    </div>
                                ):null}
                                
                                
                            </div> */}
                        </Col>
                        <Col lg='8' md='6' sm='12' className=' d-flex flex-column align-items-center '>
                                <div className='detailBody ms-5 mt-5 w-100 bg-light fontBrown'>
                                    <p className='detailInfo'>Delivery only on <span className='fw-bold'>Monday to friday</span>  at <span className='fw-bold'>1 - 7 pm</span></p>
                                    <p className='detailDescription mt-4'>
                                        {dataProducts.detail.description}
                                    </p>
                                </div>
                                {/* <div className='mt-3 ms-5 d-flex align-items-center flex-column detailDelivery'>
                                    <p className='fw-bold detailDeliveryTitle'>Choose Delivery Methods</p>
                                    <div className='d-flex'>
                                        <Button className='m-2 brown fontWhite btnActionDelivery'> Dine In</Button>
                                        <Button className='m-2  brown fontWhite btnActionDelivery'> Door Delivery</Button>
                                        <Button className='m-2  brown fontWhite btnActionDelivery'> Pick Up</Button>
                                    </div>
                                    <div className='d-flex align-items-center mt-3 mb-5'>
                                        <Label for="" className='me-2'>Set time : </Label>
                                        <InputMui id="component-simple" />
                                    </div>
                                </div> */}
                            {/* <div className='detailBody  pt-5'>
                                {JSON.stringify(dataProducts.detail)}
                                <h1 className='text-capitalize'>{dataProducts.detail.productName}</h1>
                                <h2>IDR {dataProducts.detail.price}</h2>
                                <p className='fs-5 brown'>{dataProducts.detail.description}</p>
                                <Input type="select" name="" defaultValue="" className='mb-2 mt-5 p-2 cursor  rubik' >
                                    <option value="Small">Small</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Large">Large</option>
                                </Input>
                                <Input type="select"  name="" defaultValue="" className='mb-2 p-2 cursor rubik' >
                                    
                                    <option value="Dine In">Dine In</option>
                                    <option value="PickUp">Pick Up</option>
                                    <option value="Delivery">Delivery</option>
                                </Input>
                                <Button type="" className='bgyellow btnDetail  mb-2 w-100 fw-bold'>Add to Cart</Button>
                                <br />
                                <Button type="" className='bgbrown btnDetail  mb-2 w-100 fw-bold'>CheckOut</Button>

                            </div> */}
                        </Col>
                    </Row>
                    {cart.cart.map((e,i)=>{
                        if(e.id === idProduct ){
                            return(
                                <div key={i} className='checkOut position-absolute ms-4'>
                                    <div className='d-flex'>
                                        <div className='checkOutProduct d-flex align-items-center w-100'>
                                            <div className='checkOutPicture '>
                                                <div className='checkOutProductImage'>
                                                    <img 
                                                    src={`${API_URL}${dataProducts.detail.photo}`}
                                                    alt="" />
                                                </div>
                                            </div>
                                            <div className= 'checkOutTitle'>
                                                <h1 className='text-capitalize'>{dataProducts.detail.productName}</h1>
                                            </div>
                                            <div className='checkOutQty d-flex'>
                                                <div className='checkOutQtyButton' onClick={()=>handleCart(dataProducts.detail)}>
                                                    +
                                                </div>
                                                <div className='checkOutQtyNumber'>
                                                    {e.qty}
                                                </div>
                                                <div className='checkOutQtyButton' onClick={()=>btnRemove(dataProducts.detail)}>
                                                    -
                                                </div>
                                            </div>
                                        </div>
                                        <Button onClick={()=>history.push('/yourcart')} className='checkOutButton btn d-flex align-items-center justify-content-center'>
                                            <p className='m-0'>Check Out</p>
                                        </Button>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </Container>
                    {/* {JSON.stringify(user.user.admin)} */}
            </div>
            <Footer />
        </div>
        

    )
}
export default Details