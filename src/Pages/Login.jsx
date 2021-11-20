import Footer from '../Components/Footer'
import { useState} from 'react'
import { ACTION_LOGIN } from '../Redux/actions/users'
import {Link, useHistory} from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input,Navbar } from 'reactstrap'
import './Login.css'

const Login = () =>{
    const [formLogin, setformLogin] = useState({
        email : '',
        password : ''
    })
    const history = useHistory();
    const [errorMsg, setErrorMsg] = useState();
    const changeInputLogin = (e) =>{
        setformLogin({
            ...formLogin,
            [e.target.name] : e.target.value
        })
    }

    const handleSignIn = (e) =>{
        e.preventDefault();
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formLogin.email)){
            ACTION_LOGIN(formLogin)
            .then((response)=>{
                history.push("/")
            }).catch((err)=>{
                console.log(err)
                alert("Email / Password salah");
                history.push('/login')
            })
        }else{
            setErrorMsg("Please Fill Valid Email");
        }
    }

    return(
        <div> 
            <div className='d-flex'>
                <div className='aside'>
                    <img className='img' width='100%' height='100%' src="https://images.wallpaperscraft.com/image/single/coffee_cup_wooden_surface_106291_1920x1080.jpg" alt="" />
                </div>
                <div className='section'>
                    <Navbar className="navbar navbar-light">
                        <div className="container-fluid ps-lg-5 ps-3 pt-2" >
                            <Navbar onClick={()=>{history.push('/')}} className="navbar-brand fs20 fw-bold">
                            <img src="https://drive.google.com/uc?id=1yJHjPjjw7DYfmxY69ia9wZTlZ2CqipIY" alt="" width="20" height="23" className="d-inline-block align-text-top me-2" />
                            Coffee Shop
                            </Navbar>
                            <h2 className="fw-bold textBrown ps-lg-5 pt-2">Login</h2>
                        </div>
                    </Navbar>
                    <Form onSubmit={handleSignIn} className="form d-flex flex-column align-items-center">
                        <FormGroup className="mb-3 w-75">
                            <Label for="exampleInputEmail1" className="form-label fw-bold silver fs15">Email address</Label>
                            <Input type="email" onChange={changeInputLogin} required name='email' value={formLogin.email} className="form-control input fsinput " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your Email Address" />
                        </FormGroup>
                        <FormGroup className="mb-3 w-75">
                            <Label for="exampleInputPassword1" className="form-label fw-bold silver fs15">Password</Label>
                            <Input type="password" onChange={changeInputLogin} required name='password' value={formLogin.password} className="form-control input fsinput  " id="exampleInputPassword1" placeholder="Enter Your Password" />
                        </FormGroup>
                        
                        <Link to="#" className="w-75 textBrown fs12 fw-bold">
                            Forgot password
                        </Link>
                        <p className="text-danger fw-bold">{errorMsg}</p>
                        <Button  type="submit" className="btn w-75 mt-3 btnSubmit bgyellow textBrown fw-bold shadow"> Submit
                        </Button>
                    </Form>
                    <div className="d-flex flex-column align-items-center">
                        <Button className="btn btn-css w-75 bg-light m-2 shadow fw-bold text-dark">
                            <svg className="me-2" width="17" height="18" viewBox="0 0 366 372" xmlns="http://www.w3.org/2000/svg"><path d="M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z" id="Shape" fill="#EA4335"/><path d="M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z" id="Shape" fill="#FBBC05"/><path d="M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z" id="Shape" fill="#4285F4"/><path d="M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z" fill="#34A853" /></svg>
                            Sign in With Google
                        </Button>
                        <p className="m-4 fw-bold silver fs12">Don't have an Account</p>
                        <Link to='/Register' className="btn bgbrown btn-css w-75 m-2 shadow fw-bold text-light">
                            Sign up here
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )

}
export default Login