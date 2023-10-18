import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from '../src/pages/Dashboard';
import SignUp from '../src/pages/SignUp';
import Login from '../src/pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/signup'  element={<SignUp />} />
        <Route path='/Login'  element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
