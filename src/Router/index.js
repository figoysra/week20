import { Switch, Route } from "react-router-dom";
import Home from '../Pages/Home'
import Products from '../Pages/Products'
import DtlProducts from '../Pages/DtlProducts'
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Yourcart from "../Pages/Yourcart";
import History from "../Pages/History"
import Profile from "../Pages/Profile"
import Guard from "./Guard";


const Router = () =>{
    return(
        <Switch>
            <Route path='/' exact>
                <Home />
            </Route>
            <Route path='/products' >
                <Products />
            </Route>
            <Route path='/detail/:id'>
                <DtlProducts />
            </Route>
            <Route path='/products'>
                <Products />
            </Route>
            <Route path='/login'>
                <Login />
            </Route>
            <Route path='/register'>
                <Register />
            </Route>
            {/* <Route path='/yourcart'>
                <Yourcart />
            </Route> */}
            {/* <Route path='/history'>
                <History />
            </Route> */}
            <Guard path='/profile' component={Profile} />
            {/* <Route path='/profile'>
                <Profile />
            </Route> */}
            <Guard path='/yourcart' component={Yourcart} />
            <Guard path='/history' component={History} />
        </Switch>
    )
}
export default Router