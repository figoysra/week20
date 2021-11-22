import { useEffect, useState} from 'react'
import {Link, useHistory, useLocation} from 'react-router-dom'
import Nav from '../Components/Nav'
import Footer from '../Components/Footer'
import { Container, Row, Col, Form, Label, Input, Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { useSelector, useDispatch } from "react-redux";
import { ACTION_GET_ALL_CATEGORY } from '../Redux/actions/category'
import { USER_DATA } from '../Redux/actions/users'
import { ACTION_GET_ALL_PRODUCTS, HANDLEPAGINATION, INSERT_PRODUCTS, SEARCH_PRODUCT } from "../Redux/actions/products";
import { API_URL } from '../Utils/constants'
import CurrencyFormat from "react-currency-format";
import './products.css'

const Products = () =>{
    const loginStatus = localStorage.getItem("token");
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const history = useHistory()
    const location = useLocation();
    const [promo, setPromo] = useState([])
    const query = new URLSearchParams(location.search);
    const resultSearch = query.get("search");
    const dispatch = useDispatch()
    const dataProducts = useSelector(state =>state.products)
    const category = useSelector(state=>state.category)
    const user = useSelector(state=>state.users)
    const [inputProducts, setInputProducts] = useState({
        productName : '',
        photo : '',
        photoPriview: '',
        price: '',
        description: '',
        categoryID : ''
    })
    const changeInputText = (e) => {
        setInputProducts({
            ...inputProducts,
            [e.target.name] : e.target.value
        })
    }
    const changeInputFile = (e) =>{
        // console.log(e.target.files[0].name)
        setInputProducts({
            ...inputProducts,
            photo : e.target.files[0],
            photoPriview: URL.createObjectURL(e.target.files[0])
        })
    }
    
    const getDataProducts = () =>{
        dispatch(ACTION_GET_ALL_PRODUCTS())
    }
    const getdataCategory = () =>{
        dispatch(ACTION_GET_ALL_CATEGORY())
    }
    const getDataUser =()=>{
        dispatch(USER_DATA())
    }
    useEffect(() => {
        getDataProducts()
        getdataCategory()
        getDataUser()
        setPromo([
        {
            image: "https://drive.google.com/uc?id=1CzAFeYRKFds15e6qWffLk1R1k62FR9p2",
            title: "Happy Mother's Day",
            promo: "Get one of our favorite menu for free!",
            color: "#88B788",
        },
        {
            image: "https://drive.google.com/uc?id=1l5aXI8jrGGEwqtWZ67gi9_b7SqUAQc3r",
            title: "Get a cup of coffee for free on sunday morning",
            promo: "Only at 7 to 9 AM",
            color: "#f5c361",
        },
        {
            image: "https://drive.google.com/uc?id=1CzAFeYRKFds15e6qWffLk1R1k62FR9p2",
            title: "Happy Mother's Day",
            promo: "Get one of our favorite menu for free!",
            color: "#88B788",
        },
        {
            image:
            "https://www.figma.com/file/fasJn1Olwj6azeNptPY9zB/image/e25b8a97346f786692a9f23c7fc959db9981ae5c?fuid=912948118055089498",
            title: "Happy Halloween!",
            promo:
            "Do you like chicken wings? Get 1 free only if you buy pinky promise",
            color: "#C59378",
        },
        ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    useEffect(()=>{
        if (resultSearch && resultSearch !== "" && resultSearch !== 'undefined') {
            dispatch(SEARCH_PRODUCT(resultSearch))
        } else {
            getDataProducts()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[resultSearch])
    

    const dataPagination = {
        page : query.get("page"),
    }
    const movePage = (page) => {
      // e.preventDefault()
        history.push(`/products?page=${page}`);
    };
    useEffect(()=>{
        dispatch(HANDLEPAGINATION(dataPagination));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[query.get("page"), query.get("limit")])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(inputProducts)
        const formData = new FormData()
        formData.append('productName', inputProducts.productName)
        formData.append('photo', inputProducts.photo)
        formData.append('price', inputProducts.price)
        formData.append('description', inputProducts.description);
        formData.append("categoryID", inputProducts.categoryID);
        INSERT_PRODUCTS(formData, loginStatus)
        .then((response)=>{
            alert('Insert Product Success')
            setInputProducts({
                productName : '',
                photo : '',
                photoPriview: '',
                price: '',
                description: '',
                categoryID : ''
            })
            getDataProducts()
        })
        .catch((err)=>{
            console.log(err)
            alert('Insert Products Failed')
        })
    }
    console.log(user)

    return(
        <div>
            <Nav token={loginStatus} />
            <div className='main'>
                <div className='promoContent bdr'>
                    <div className="pt-lg-4 pt-md-4 pt-2 title-aside">
                        <h5 className="textBrown fw-bolder">Promo Today</h5>
                        <p className="poppins p-2 fs12">Coupons will be updated every weeks. Check them out!</p>
                    </div>
                    <div className="d-flex flex-lg-column flex-md-column align-items-lg-center p-2 promo">
                        {
                            promo.map((e,i)=>{
                                return (
                                <div
                                    key={i}
                                    className="card d-flex flex-row poppins mb-lg-2 mb-md-2"
                                    style={{ backgroundColor: e.color }}
                                    >
                                        <img src={e.image} alt="" width="75px" />
                                        <div className="card-body  promotext">
                                        <div className="card-text fw-bold fs12">
                                            {e.title}
                                        </div>
                                        <div className="card-text mt-2 fs12">
                                            {e.promo}
                                        </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className="d-flex justify-content-lg-center justify-content-md-center p-lg-0 p-md-0 p-2 ">
                        <Link to='#' className="btn bgd-darkbrown text-white btnSubmitPromo  fs12 fw-bolder action">Apply Button</Link>
                    </div>

                    <div className="ms-lg-5 mt-lg-5 mt-3 ms-2 term">  
                        <p className="m-0 ms-1">Term and Condition</p>
                        <ul className="fs12 list-term">
                            <li>You can only apply 1 coupon per day</li>
                            <li>It only afor dine in</li>
                            <li>Buy 1 get 1 only for new user</li>
                            <li>Should make member card to apply coupon</li>
                        </ul>
                    </div>
                </div>
                <div className='content'>
                    <Container>
                        <Row className='ps-lg-5 pe-lg-5 mt-4'>
                            {/* {JSON.stringify(users)} */}
                            {
                                dataProducts.all.map((e)=>(
                                    <Col key={e.id} xs="6" md='4' lg='3' className='d-flex justify-content-center p-2'>
                                            <div className="product" onClick={()=>{history.push('/detail/'+ e.id)}}>
                                            <div className="round-border shadow">
                                                <img src={`${API_URL}/${e.photo}`} alt="" width='100%' height='100%' />
                                            </div>
                                            <h1 className='text-uppercase'>{e.productName}</h1>
                                            <h2 className='fw-bold'><CurrencyFormat value={e.price} displayType={'text'} thousandSeparator={true} prefix={'IDR '} /></h2>
                                        </div>
                                    </Col>
                                ))
                            }
                            
                        </Row>  
                    </Container>
                    <Container className='ps-lg-5 pe-lg-5 mt-lg-5'>
                        <p>Go to Page ...</p>
                        {[...Array(dataProducts.paginationTags.totalPage)].map((e,i)=>
                            dataProducts.paginationTags.page === i + 1 ? (
                                <button type="" key={i} className="btnPaginationClick" onClick={()=> movePage(i+1)}>{i + 1}</button>
                            ):(
                                <button type="" key={i} className="btnPagination" onClick={()=> movePage(i+1)}>{i + 1}</button>
                            )
                            //  <>
                            //         <button type="" key={i} onClick={()=> movePage(i+1)}>{i + 1}</button>
                            //     </>
                        )}
                    </Container>
                    
                    {/* {JSON.stringify(user.user.admin)} */}
                    {user.user.admin !== 0 && user.user.admin !== undefined ? (
                        <div className="d-flex justify-content-lg-center justify-content-md-center p-lg-0 p-md-0 p-2 mt-2 ">
                            <Link to='#' onClick={toggle}  className="btn bgd-darkbrown text-white btnSubmitPromo  fs12 fw-bolder action"> New Data</Link>
                        </div>
                    ): null}
                    
                    <Modal isOpen={modal} toggle={toggle} >
                        <ModalHeader toggle={toggle}>Add New Data</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={handleSubmit}>
                                <Label for="">Products</Label> 
                                <Input type="text" required onChange={changeInputText} name="productName" value={inputProducts.productName} placeholder="" /><br/>
                                <Label for="" >Image</Label><br/>
                                <Input type="file" required onChange={changeInputFile}   name="photo" placeholder="" /><br/>
                                <img width="auto" height={100} src={inputProducts.photoPriview} alt="" /><br/>
                                <Label for="">Price</Label> 
                                <Input type="number" required onChange={changeInputText} name="price" value={inputProducts.price}  placeholder="" /><br/>
                                <Label for="" >Description</Label>
                                <Input type="textarea" name="description" onChange={changeInputText} value={inputProducts.description}   /><br />
                                <Label for=''>Select Category</Label>
                                {/* {JSON.stringify(category.all)} */}
                                <select type="select" name="categoryID" id="exampleSelect" className='p-2 w-100' value={inputProducts.categoryID}
                                onChange={changeInputText}>
                                    {
                                        category.all.map((e, i)=>{
                                            return (
                                                <>
                                                    <option value="" selected disabled hidden>Choose here</option>
                                                    <option key={i} value={e.id}>
                                                    {e.category}
                                                    </option>
                                                </>
                                            );
                                        })
                                    }
                                </select><br />
                                <Button type='submit' className='w-100 m-2 btn btnAddData'  onClick={toggle}>Add Data</Button><br />
                                <Button className='w-100 m-2 btn btnCancelData' onClick={toggle}>Cancel</Button>
                            </Form>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default Products