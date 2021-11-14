import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import productReducer from "./reducers/products";
import usersReducer from "./reducers/users";
import categoryReducer from "./reducers/category";
import cartReducer from "./reducers/cart";
import transactionReducer from "./reducers/transaction"
import productTransaction from "./reducers/productTransaction";

const reducers = combineReducers({
    products: productReducer,
    users: usersReducer,
    category: categoryReducer,
    cart: cartReducer,
    transaction: transactionReducer,
    productTransaction: productTransaction,
});

const middleware = applyMiddleware(thunk,logger)
const store = createStore(reducers, middleware)

export default store