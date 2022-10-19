import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import { ThemeProvider } from '@emotion/react';
import theme from './Theme/Theme';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthState } from './Context/AuthContext'
import Payment from './pages/Payment';
import { CartState } from './Context/Context';
import Orders from './pages/Orders';
import PreviewOrder from './pages/PreviewOrder';

function App() {

  const { user } = AuthState()
  const { cart } = CartState()

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route 
            exact path='/' 
            element={user ? <Home /> : <Navigate to="/login"/>}
          />
          <Route 
            exact path='/login' 
            element={!user ? <Login /> : <Navigate to="/"/>}
          />
          <Route 
            exact path='/signup' 
            element={!user ? <Signup /> : <Navigate to="/"/>}
          />
          <Route 
            exact path='/cart'
            element={user ? <Cart />: <Navigate to="/login"/>}
          />
          <Route 
            path='/:id'
            element={<ProductDetails />}
          />
          <Route 
            path='/checkout'
            element={cart.length !== 0  && user ? <Checkout/> :<Navigate to="/"/>}
          />
          <Route
            path='/payment'
            element={user ? <Payment/>: <Navigate to="/"/>}
          />
           <Route
            path='/preview'
            element={user ? <PreviewOrder/>: <Navigate to="/"/>}
          />
           <Route
            path='/order_history'
            element={user ? <Orders/>: <Navigate to="/"/>}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

