import { Container } from "react-bootstrap";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./views/Home";
import Products from "./views/Products";

function App() {
  return (
    <Router>
      <Header/>
      <main className="py-3">
        <Container>
          <Route path='/' component={Home} exact/>
          <Route path='/products/:id' component={Products}/>
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
