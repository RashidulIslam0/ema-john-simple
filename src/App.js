import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
// import Inventory from './components/Inventory/Inventory';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';

function App() {
  return (
    <div >
      <Header/>
      <Router>
        <Switch>
          <Route path="/shop">
            <Shop />
          </Route>
          <Route path="/review">
            <Review/>
          </Route>
          <Route path="/inventory">
            <Inventory/>
          </Route>
          <Route path="/shipment">
            <Shipment />
          </Route>
          <Route path="/login">
           <Login/>
          </Route>
          <Route exact  path="/">
            <Shop/>
          </Route>
          <Route path="/Product/:productKey">
            <ProductDetail/>
          </Route>
          <Route path="/*">
            <NotFound/>
          </Route>
        </Switch>
      </Router>
 
    {/* <Shop/> */}
    </div>
  );
}

export default App;
