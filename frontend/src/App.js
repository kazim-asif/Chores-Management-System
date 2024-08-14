import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Routing from './routes/routing';

function App() {
  return (
    <div className="App">
      
      {/* Navigation Buttons */}
      <Navbar className='px-3' bg="dark" variant="dark">
        <Navbar.Brand>Chores Management App</Navbar.Brand>
        <Nav className="mr-auto">
          <Link to="/chores" className="nav-link">
            <Button variant="dark">Chore Management</Button>
          </Link>
          <Link to="/users" className="nav-link">
            <Button variant="dark">User Management</Button>
          </Link>
        </Nav>
      </Navbar>

      <Routing />

    </div>
  );
}

export default App;
