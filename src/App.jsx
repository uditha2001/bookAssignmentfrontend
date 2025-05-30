import { Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import GuestLayout from './Layouts/GuestLayout';
import AuthenticatedLayout from './Layouts/AuthenticatedLayout.jsx';
import EditProducts from './components/EditProducts'; // Add this import at the top
import OrderCheckout from './pages/OrderCheckout.jsx'; // Add this import at the top

const Home = React.lazy(() => import('./pages/HomePage.jsx'));
const Login = React.lazy(() => import('./pages/Login.jsx'));
const Signup = React.lazy(() => import('./pages/Register.jsx'));
const Cart = React.lazy(() => import('./pages/CartViewPage.jsx'));
const ProductManage= React.lazy(() => import('./pages/ProductManagement.jsx'));
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<GuestLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Route>
        <Route element={<AuthenticatedLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/products" element={<ProductManage/>} />
            <Route path="/editProducts" element={<EditProducts />} />
            <Route path="/orderCheckout" element={<OrderCheckout />} /> {/* Add this line */}
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
