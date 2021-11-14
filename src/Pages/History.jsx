import Nav from '../Components/Nav'
import Footer from '../Components/Footer'
import { Container, Row, Col, Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import { GET_TRANSACTION } from '../Redux/actions/transaction';
import { useDispatch,useSelector } from 'react-redux';
import CurrencyFormat from "react-currency-format";
import { GET_PRODUCT_TRANSACTION } from '../Redux/actions/productTransaction';
import { API_URL } from '../Utils/constants';
import './History.css'
import { useEffect, useState } from 'react';
import moment from "moment"

const History = () =>{
    const dispatch = useDispatch()
    const invoice = useSelector(store => store.transaction)
    const product = useSelector(store => store.productTransaction)
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    
    const getInvoice = () =>{
        dispatch(GET_TRANSACTION())
    }
    const getProduct = (id) =>{
        setModal(!modal);
        dispatch(GET_PRODUCT_TRANSACTION(id));
    }
    useEffect(()=>{
        getInvoice()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
        <div>
            <Nav />
            <main>
                <Container>
                    <div className='historyTitle text-white pt-2 w-100 d-flex justify-content-center pb-3'>
                        <h1>Let’s see what you have bought!</h1>
                        
                    </div>
                    <Row>
                        {/* {JSON.stringify(invoice.transaction.data)} */}
                        {invoice.transaction.map((e,i)=>(
                            <Col md='4' xs="6" key={i} className='p-md-3 p-2 col'>
                                <div className='historyCard bg-white p-lg-4 '>
                                    <div className='historyCardTitle pb-2'>
                                        <h1>INV #{e.inv} <span></span></h1>
                                        <p>{moment(e.date).format('LL')}</p>
                                    </div>
                                    <p className="text-capitalize m-0 mt-2 text-capitalize">Customer : {e.displayname}</p>
                                    <p className="m-0 mt-2 text-capitalize">Payment Method : {e.payment_method}</p>
                                    <p className="m-0 mt-2 text-capitalize">Description : {e.description}</p>
                                    <p className="m-0 mt-2 text-capitalize ">Address : {e.alamat}</p>
                                    <p className="m-0 mt-2 text-capitalize mb-3">
                                        <CurrencyFormat value={e.tax} displayType={'text'} thousandSeparator={true} prefix={'Tax : Rp. '} />
                                    </p>
                                
                                    <button type="" className="btn btn-success" onClick={() => getProduct(e.id)}>Let See What have You Bought</button>
                                    <Modal isOpen={modal} toggle={toggle} >
                                        <ModalHeader toggle={toggle}>What have You Bought</ModalHeader>
                                        <ModalBody>
                                            <div className='historyCardBody'>
                                                {/* {JSON.stringify(product.data)} */}
                                                {product.data.map((e)=>{
                                                    return (
                                                        <div className='d-flex'>
                                                            <div className='historyCardImage'>
                                                                <div className='imageBorder'>
                                                                    <img src={`${API_URL}/${e.photo}`} alt="" />
                                                                </div>
                                                            </div>
                                                            <div className='historyCardProduct w-75 ps-3'>
                                                                <h1 className='text-capitalize'>{e.productName}</h1>
                                                                {/* <h2 className='text-capitalize'>Main Course</h2> */}
                                                                <Row>
                                                                    <Col xs="6">
                                                                        <p className='fw-bold'>
                                                                            <CurrencyFormat value={e.price} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
                                                                        </p>
                                                                    </Col>
                                                                    <Col xs="6">
                                                                        <p className='fw-bold'>Qty: {e.qty}</p>
                                                                        <p>
                                                                            <CurrencyFormat value={e.price * e.qty} displayType={'text'} thousandSeparator={true} prefix={'Total : Rp. '} />
                                                                        </p>
                                                                    </Col>
                                                                </Row>
                                                                <hr />
                                                            </div>
                                                        </div> 
                                                    )
                                                })}
                                                
                                            </div>
                                            <Button className='w-100 m-2 btn btn-danger' onClick={toggle}>Close</Button>
                        
                                        </ModalBody>
                                    </Modal>
                                    
                                    <div className='historyCardFooter mt-4'>
                                        <p className="m-0">Total</p>
                                        <h2><CurrencyFormat value={e.total} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /></h2>
                                        {/* <h1>{e.total}</h1> */}
                                    </div>
                                </div>
                            </Col> 
                        ))}

                        
                    </Row>
                </Container>
            </main>
            <Footer />
        </div>
    )
}
export default History