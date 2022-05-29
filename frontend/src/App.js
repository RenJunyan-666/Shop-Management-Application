import { Container } from "react-bootstrap";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./views/Home";
import Products from "./views/Products";
import Cart from "./views/Cart";

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
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
