/* eslint-disable react-hooks/exhaustive-deps */
import Nav from '../Components/Nav.js'
import Footer from '../Components/Footer.js'
import "./yourcart.css";  
import { Container, Row, Col,Input,FormGroup, Label,Button } from 'reactstrap'
import { AiFillCreditCard, AiOutlineBank, AiFillMinusCircle} from "react-icons/ai";
import { USER_DATA } from '../Redux/actions/users.js';
import { useDispatch, useSelector } from 'react-redux';
import { GrDeliver } from "react-icons/gr";
import CurrencyFormat from "react-currency-format";
import { useEffect } from 'react';
import { API_URL } from '../Utils/constants.js';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { TextField } from '@material-ui/core';
import { INSERT_TRANSACTION } from '../Redux/actions/transaction.js';
import {DELETE_CART} from '../Redux/actions/cart'


const Yourcart = () =>{
    
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(store => store.users)
    const cart = useSelector(store => store.cart)
    // const [deletedCart, setDeletedCart] = useState()
    const [form, setForm] = useState({
        inv: '',
        alamat: '',
        payment_method: '',
        subTotal: '',
        tax: '',
        shipping: '',
        phone: '',
        total: '',
        description : '',
        details: '',
    });
    const getRemove = (id) => {
        dispatch(DELETE_CART(id))
    };

    const getDataUser = () =>{
        dispatch(USER_DATA())
    }
    const changeText = (e) =>{
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }
    

    useEffect(()=>{
        getDataUser()
    },[])
    useEffect(()=>{
        setForm({
            ...form, 
            alamat : user.user.address ,
            phone : user.user.phone

        })
    }, [user.user])
    
    
    // console.log(cart.cart)
    const itemPrice = cart.cart.reduce((total, product)=> total + product.qty * product.price, 0)
    const ppn = itemPrice * 10 / 100
    const shipping = parseInt(form.shipping)
    const total = itemPrice + shipping + ppn
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(form.shipping !== "" || form.shipping !== undefined || form.alamat !== "" || form.alamat !== undefined || form.payment_method !== undefined || form.payment_method !== "" || form.phone !== undefined || form.phone !== ""){
            const transaction = {
                inv: Math.floor(Math.random() * 100000 + 1),
                alamat: form.alamat,
                payment_method: form.payment_method,
                subTotal: itemPrice,
                tax: ppn,
                shipping: shipping,
                phone: form.phone,
                total: total,
                description: form.description,
                details: cart.cart,
            };
            INSERT_TRANSACTION(transaction)
            .then((res)=>{
                // console.log(res)
                alert('Transaction Success')
                history.push('/history')
            }).catch((err)=>{
                // console.log(err)
                alert('Transaction Failure')
            })
        }else{
            alert("Please Fill input field");
        }
        
    }
    // console.log(form.alamat)
    

    return(
        <div>
            <Nav />
            <div className='background '>
                <Container>
                    {cart.cart.length <= 0 ?(
                        <div className='noCart d-flex flex-column align-items-center justify-content-center text-white'>
                            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.icon-icons.com%2Ficons2%2F1095%2FPNG%2F512%2F1485476036-artboard-1_78544.png&f=1&nofb=1" alt="" />
                            <h1>No Transactions Found</h1>
                            <p className='text-center'>After your first transaction you will able to view it here</p>
                            <Button className='btn p-2' onClick={()=>history.push("/products")}>GOT IT</Button>
                        </div>
                    ): (
                        <div>
                        <Row className='pt-5 pb-5'>
                            
                                <Col lg='6' md='6' sm='12'>
                                <div className='productTitle p-3'>
                                    <h1>Checkout your item now!</h1>
                                </div>
                                <div className='productBorder p-3 w-75'>
                                    <div className='p-3 d-flex align-items-center justify-content-center'>
                                        <h1 className='productBorderTitle'>Order Summary</h1>
                                    </div>
                                    <div className='productList'>
                                        {/* {JSON.stringify(cart.cart)} */}
                                        {
                                            cart.cart.map((e,i)=>(
                                                <div key={i} className=' p-3 w-100 poppins  d-flex'>
                                                    <div className='productImage '>
                                                        <div className='productImg'>
                                                            <img src={`${API_URL}${e.photo}`} alt="" />
                                                        </div>
                                                    </div>
                                                    <div className='productBody '>
                                                        <p className='text-capitalize fw-bold ms-2 m-0'>{e.productName}</p>
                                                        <p className="m-0 ms-2">x {e.qty}</p>
                                                    </div>
                                                    <div className='productPrice d-flex '>
                                                        <p>
                                                            <CurrencyFormat value={e.price * e.qty} displayType={'text'} thousandSeparator={true} prefix={'Rp '} />
                                                        </p>
                                                    
                                                        
                                                        <AiFillMinusCircle className="ms-3 fs18 text-danger pointer"  onClick={()=>getRemove(e.id)} />
                                                        
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    
                                    <hr />
                                    <div>
                                        <Row>
                                            <Col md="6">
                                                <div className='fs15 textBrown poppins d-flex flex-column align-items-start'>
                                                    <p className='m-1'>SUBTOTAL</p>
                                                    <p className='m-1'>TAX & FEES</p>
                                                    <p className='m-1'>SHIPPING</p>
                                                </div>
                                            </Col>
                                            <Col md="6">
                                                <div className='fs15 textBrown poppins d-flex align-items-end flex-column '>
                                                    <p className='m-1'>
                                                        <CurrencyFormat value={itemPrice} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />
                                                    </p>
                                                    <p className='m-1'>
                                                        <CurrencyFormat value={ppn} displayType={'text'} thousandSeparator={true} prefix={'Rp '} />
                                                    </p>
                                                    <p className='m-1'>
                                                        <CurrencyFormat value={form.shipping} displayType={'text'} thousandSeparator={true} prefix={'Rp '} />
                                                    </p>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className='totalPrice poppinsbold pt-3 pb-3'>
                                        <Row>
                                            <Col md="6">
                                                <h1 className='fs20 textBrown fw-bold'>Total</h1>
                                            </Col>
                                            <Col md="6">
                                                <h1 className='fs20 textBrown fw-bold'>
                                                    <CurrencyFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'Rp '} />
                                                </h1>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                                <Col lg='6' md='6' sm='12'>
                                    <div className='payment'>
                                        <div className='addressDetail w-75'>
                                            <h1 className='addressDetailTitle fw-bolder text-light'>Address details</h1>
                                            <div className='addressDetailBody mt-3 p-4 bg-light'>
                                                <div className='fw-bold d-flex align-items-center'>Delivery to 
                                                <TextField className='ms-2' id="standard-basic"  variant="standard" type='text' 
                                                    value={form.alamat } onChange={changeText} name='alamat' />
                                                </div>
                                                <hr />
                                                <textarea className='addressDetailDesc' value={form.description} onChange={changeText} name='description' rows="5" cols="40"></textarea> 
                                                <hr />
                                                <div className='d-flex align-items-center'>
                                                    Number Phone :
                                                    <TextField 
                                                    className='ms-2' 
                                                    id="standard-basic"  
                                                    variant="standard" 
                                                    type='number' 
                                                    value={form.phone} 
                                                    onChange={changeText} 
                                                    name='phone' 
                                                />
                                                </div>
                                                
                                            </div>
                                        </div>
                                        <div className='deliveryMethod mt-3 w-75'>
                                            <h1 className='deliveryMethodTitle fw-bold text-light'>Delivery Method</h1>
                                            <div className='mt-3 p-4 bg-light fw-bold paymentMethodBody'>
                                                <div className='d-flex'>
                                                    <FormGroup check>
                                                    <Label check className='me-3'>
                                                        <Input type="radio" name='shipping' value='0' onChange={changeText} />{' '}
                                                        Dine In
                                                    </Label>
                                                </FormGroup>
                                                <FormGroup check>
                                                    <Label check className='me-3'>
                                                        <Input type="radio" name='shipping' value='10000' onChange={changeText}/>{' '}
                                                        Door Delivery
                                                    </Label>
                                                </FormGroup>
                                                <FormGroup check>
                                                    <Label check className='me-3'>
                                                        <Input type="radio" name='shipping' value='0' onChange={changeText}/>{' '}
                                                        Pick Up
                                                    </Label>
                                                </FormGroup>
                                                </div>
                                                
                                            </div>

                                        </div>
                                        <div className='paymentMethod mt-3 w-75'>
                                            <h1 className='paymentMethodTitle text-light fw-bolder'>Payment Method</h1>
                                            <div className='paymentMethodBody mt-3 p-4 bg-light'>
                                                <FormGroup check>
                                                    <Label check>
                                                        <Input type="radio" name='payment_method' value='1' onChange={changeText} />{' '}
                                                        <div className=' d-flex align-items-center fs15 fw-bold'>
                                                            <div className='iconBorder d-flex align-items-center justify-content-center me-2 orange'>
                                                                <AiFillCreditCard className='text-light' />
                                                            </div>
                                                            Card
                                                        </div>
                                                    </Label>
                                                </FormGroup>
                                                <hr />
                                                <FormGroup check>
                                                    <Label check>
                                                        <Input type="radio" name='payment_method' value='2' onChange={changeText} />{' '}
                                                        <div className=' d-flex align-items-center fs15 fw-bold'>
                                                            <div className='iconBorder d-flex align-items-center justify-content-center me-2 brown'>
                                                                <AiOutlineBank className='text-light' />
                                                            </div>
                                                            Bank account
                                                        </div>
                                                    </Label>
                                                </FormGroup>
                                                <hr />
                                                <FormGroup check>
                                                    <Label check>
                                                        <Input type="radio" name='payment_method' value='3' onChange={changeText} />{' '}
                                                        <div className=' d-flex align-items-center fs15 fw-bold'>
                                                            <div className='iconBorder d-flex align-items-center justify-content-center me-2 yellow'>
                                                                <GrDeliver className='text-dark' />
                                                            </div>
                                                            Cash on delivery
                                                        </div>
                                                    </Label>
                                                </FormGroup>
                                            </div>
                                        </div>
                                        <Button type='submit' onClick={handleSubmit} className='applyButton fw-bold p-2 mt-3 btn brown textWhiteCart w-75'>
                                            Apply Button
                                        </Button>
                                    </div>
                                </Col>
                            
                        </Row>
                        </div>
                    )}
                </Container>
            </div>
            <Footer />
        </div>
    )
}
export default Yourcart