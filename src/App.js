import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AuthGoogle from './UI/authentication/AuthGoogle';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter><AuthGoogle></AuthGoogle></BrowserRouter>
  );
}

export default App;
