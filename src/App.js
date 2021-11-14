import './App.css';
import {BrowserRouter} from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './Router/index'
import store from './Redux/store'
import { Provider } from "react-redux";

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
