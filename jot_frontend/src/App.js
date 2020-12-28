import Navigation from './components/Navbar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Container>
        <Navigation />
      </Container>
      <body></body>
    </div>
    
  );
}

export default App;
