import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import MainPage from './pages/MainPage';
import Cart from './pages/Cart';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <Router>
      <div className="font-sans">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<MainPage />} />
          <Route path="/cart" element={<Cart />} />
          {/* Updated route to include dynamic product id */}
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
