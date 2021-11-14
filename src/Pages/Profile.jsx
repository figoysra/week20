import './Profile.css'
import Nav from '../Components/Nav'
import Footer from '../Components/Footer'
import { Container, Row, Col, Label, FormGroup, Input, Button  } from 'reactstrap'
import { TextField } from '@material-ui/core'
import { UPDATE_USERS, USER_DATA } from '../Redux/actions/users'
import { useSelector,useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { API_URL } from '../Utils/constants'
import moment from 'moment'
import { useHistory } from 'react-router-dom'

const Profile = () =>{
    const history = useHistory()
    const dispatch = useDispatch()
    // const fileInputRef = useRef(null);
    const user = useSelector(store => store.users)
    // console.log(user)
    const [form, setForm] = useState({
        email : '',
        photo: '',
        displayname : '',
        firstname : '',
        lastname: '',
        address: '',
        date:'',
        gender: '',
        phone: '',
        admin: '',
        photoPriview: '',
    })
    // console.log(form.phone)

    const getDataUser = () =>{
        dispatch(USER_DATA());
    }
    const changeText = (e) =>{
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }
    const changeInputFile= (e) => {
        setForm({
            ...form,
            photo: e.target.files[0],
            photoPriview: URL.createObjectURL(e.target.files[0])
        })
    }

    useEffect(()=>{
        getDataUser();
        // dispatch(GET_TRANSACTION());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    useEffect(()=>{
        const dataDate = moment(user.user.date).format('DD/MM/YYYY');
        setForm({
            email : user.user.email,
            photo: user.user.photo,
            displayname : user.user.displayname,
            firstname : user.user.firstname,
            lastname: user.user.lastname,
            address: user.user.address,
            date: dataDate,
            gender: user.user.gender,
            phone: user.user.phone,
            admin: user.user.admin,
        })
    },[user.user])


    const handleSubmit = (e) =>{
        e.preventDefault()
        const formData = new FormData()
        formData.append("email", form.email)
        formData.append("photo", form.photo);
        formData.append("displayname", form.displayname);
        formData.append("firstname", form.firstname);
        formData.append("lastname", form.lastname);
        formData.append("address", form.address);
        formData.append("date", form.date);
        formData.append("gender", form.gender);
        formData.append("phone", form.phone);
        formData.append("admin", form.admin);
        console.log(form)
        UPDATE_USERS(formData)
        .then((res)=>{
            alert('Update User Success')
            getDataUser()
        }).catch((err)=>{
            console.log(err)
            alert("Cannot Update Data");
        })
    }
    const handleLogOut = () =>{
        localStorage.removeItem('token')
        localStorage.removeItem('idUser')
        history.push('/')
    }

    return(
        <div>
            <Nav />
            <main>
                <Container>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <h1 className='text-white pt-5 pb-3 fw-bold profileTitle'>User Profile</h1>
                            <Row>
                                <Col xs="12" md='3' >
                                    <div className='profilePictureCard p-4 bg-white d-flex flex-column align-items-center'>
                                        <div className='borderImage'>
                                            <img src={form.photoPriview === undefined ? `${API_URL}/${form.photo}`: form.photoPriview} 
                                            alt="" />
                                        </div>
                                        <h1 className='username text-capitalize pt-2'>{user.user.displayname}</h1>
                                        <p className='email'>{user.user.email}</p>
                                        {/* <p className='amountofOrder pt-2 text-center'>Has been ordered 15 products</p> */}
                                    </div>
                                </Col>
                                <Col xs="12" md='9' >
                                    <div className='contactCard bg-white p-4'>
                                        <h1 className='contactCardTitle'>Contacts</h1>
                                        <div className='pt-3 pb-3'>
                                            <Row>
                                                <Col xs="6">
                                                    <Label>Email Address :</Label><br />
                                                    <TextField id="standard-basic" variant="standard" type='text' value={form.email} onChange={changeText} name='email' /><br />
                                                    <Label className='pt-5'>Delivery Address :</Label><br />
                                                    <TextField id="standard-basic"  variant="standard" type='text' value={form.address} onChange={changeText} name='address' />
                                                </Col>
                                                <Col xs="6">
                                                    <Label >Mobile number :</Label><br />
                                                    <TextField id="standard-basic" variant="standard" type='number' value={form.phone} onChange={changeText} name='phone' /><br />
                                                    <Label className='pt-5' >Change Profile Picture </Label><br />
                                                    <Input type="file" id="" name="photo" onChange={changeInputFile} accept="image/png, image/jpg, image/jpeg"   />
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className='pt-3 pb-5'>
                            <Row>
                                <Col md='9' xs="12">
                                    <div className='detailCard p-4 bg-white'>
                                        <h1 className='detailCardTitle'>Details</h1>
                                        <div className='pt-3'>
                                            <Row>
                                                <Col xs="6">
                                                    <Label>Display Name :</Label><br />
                                                    <TextField id="standard-basic" variant="standard" type='text' value={form.displayname} onChange={changeText} name='displayname' /><br />
                                                    <Label className='pt-4'>First Name :</Label><br />
                                                    <TextField id="standard-basic"  variant="standard" type='text' value={form.firstname} onChange={changeText} name='firstname' /><br />
                                                    <Label className='pt-4'>Last Name :</Label><br />
                                                    <TextField id="standard-basic"  variant="standard" type='text' value={form.lastname} onChange={changeText} name='lastname' />
                                                </Col>
                                                <Col xs="6">
                                                    <Label >DD/MM/YYYY :</Label><br />
                                                    <TextField id="standard-basic" variant="standard" type='date'  onChange={changeText} name='date' defaultValue={form.date}  />
                                                    <FormGroup check className='pt-3'>
                                                        <Label check>
                                                            <Input type="radio" name="gender" value='Laki Laki' onChange={changeText} checked = {form.gender === "Laki Laki" ? true : false} />{' '}
                                                            Male
                                                        </Label>
                                                    </FormGroup>
                                                    <FormGroup check className='pt-1'>
                                                        <Label check >
                                                            <Input type="radio" name="gender" value='Perempuan' onChange={changeText}  checked = {form.gender === "Perempuan" ? true : false}/>{' '}
                                                            Female
                                                        </Label>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                    
                                </Col>
                                <Col md='3' xs="12">
                                    <div className='saveChange pt-3 d-flex flex-column justify-content-center'>
                                        <h1 className='text-center text-white pb-3 saveChangeTitle'>Do you want to save the change?</h1>
                                        <Button type='submit' className='buttonBrown'>Save Change</Button>
                                        <Button className='buttonYellow'>Edit Password</Button>
                                        <Button className='bg-white colorBrown' onClick={handleLogOut}>Log out</Button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </form>
                </Container>
            </main>
            <Footer />

        </div>
    )
}
export default Profile