import { Container } from "react-bootstrap";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./views/Home";
import Products from "./views/Products";
import Cart from "./views/Cart";
import Login from "./views/Login";
import Register from "./views/Register";
import Profile from "./views/Profile";
import Shipping from "./views/Shipping";
import Payment from "./views/Payment";
import Placeorder from "./views/Placeorder";
import Order from "./views/Order";
import UserList from "./views/UserList";
import UserEdit from "./views/UserEdit";

function App() {
  return (
    <Router>
      <Header/>
      <main className="py-3">
        <Container>
          <Route path='/' component={Home} exact/>
          <Route path='/products/:id' component={Products}/>
          {/* 设置？表示id为可选项，有无id均可匹配 */}
          <Route path='/cart/:id?' component={Cart}/> 
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/profile' component={Profile} />
          <Route path='/shipping' component={Shipping} />
          <Route path='/payment' component={Payment} />
          <Route path='/placeorder' component={Placeorder} />
          <Route path='/order/:id' component={Order} />
          <Route path='/admin/userlist' component={UserList} />
          <Route path='/admin/user/:id/edit' component={UserEdit} />
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
