import './nav.css'
import { useEffect, useState } from 'react'
import React from 'react';
import { Link,useHistory } from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container, 
    Input
} from 'reactstrap';
import { USER_DATA } from '../Redux/actions/users';
import { useSelector, useDispatch } from 'react-redux';
import { API_URL } from '../Utils/constants';

const NavBar = ({token}) =>{

    const [isOpen,setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen);
    const [search,setSearch] = useState()
    const history = useHistory();
    const dispatch = useDispatch()
    const user = useSelector(state => state.users)


    const handleSearch=(e) =>{
        e.preventDefault()
        
        history.push(`/products?search=${search}`);
    }
    const getDataUser = ()=>{
      dispatch(USER_DATA())
    }
    useEffect(()=>{
      getDataUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
      <div>
        <Navbar color="light" light expand="md" className="rubik shadow">
          <Container>
            <NavbarBrand className="cursor fw-bold p-2 ">
              <img
                src="https://drive.google.com/uc?id=1yJHjPjjw7DYfmxY69ia9wZTlZ2CqipIY"
                alt=""
                width="20"
                height="23"
                className="d-inline-block align-text-top me-2"
              />
              Coffee Shop
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav
                  className="cursor fw-bold fs15 d-flex justify-content-lg-center w-75"
                  navbar
                >
                  <NavItem className="navItem navUp">
                    <Link
                      className="text-decoration-none secondMenu me-3"
                      to="/"
                    >
                      Home
                    </Link>
                  </NavItem>
                  <NavItem className="navItem">
                    <Link
                      className="text-decoration-none secondMenu me-3"
                      to="/products"
                    >
                      Product
                    </Link>
                  </NavItem>
                  {user.user.admin === 0 || user.user.admin === undefined ? (
                    <>
                      <NavItem className="navItem">
                        <Link
                          className="text-decoration-none secondMenu me-3"
                          to="/yourcart"
                        >
                          Your Cart
                        </Link>
                      </NavItem>
                      <NavItem className="navItem navDown">
                        <Link
                          className="text-decoration-none secondMenu me-3"
                          to="/history"
                        >
                          History
                        </Link>
                      </NavItem>
                    </>
                  ) : null}
                </Nav>
                <Nav>
                  {token === null ? (
                    <div className="d-flex align-items-center navButton ">
                      <NavItem className="me-1 fw-bold">
                        <Link
                          className="text-decoration-none text-dark me-4"
                          to="/login"
                        >
                          Login
                        </Link>
                      </NavItem>
                      <NavItem>
                        <button
                          className="btn btnSignUp"
                          onClick={() => history.push("/register")}
                        >
                          SignUp
                        </button>
                      </NavItem>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center ">
                      <form onSubmit={handleSearch} className='searchBox'>
                        <Input
                          className="p-1 fs15 searchInput"
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="Search"
                          type="text"
                          name=""
                        />
                      </form>
                      <div className="chat">
                        {/* {JSON.stringify(user.user.photo)} */}
                        <div className="notif">
                          <p>1</p>
                        </div>
                        <img
                          src="https://image.flaticon.com/icons/png/512/1380/1380370.png"
                          alt=""
                        />
                      </div>
                      <div
                        className="image"
                        onClick={() => history.push("/profile")}
                      >
                        <img src={`${API_URL}/${user.user.photo}`} alt="" />
                      </div>
                    </div>
                  )}
                </Nav>
              
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
}
export default NavBar