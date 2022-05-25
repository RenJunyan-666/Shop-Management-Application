import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./views/Home";

function App() {
  return (
    <div>
      <Header/>
      <main className="py-3">
        <Container>
          <Home/>
        </Container>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
