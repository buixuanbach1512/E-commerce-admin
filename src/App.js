import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Page
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import Order from './pages/Order';
import Customer from './pages/Customer';
import ListCategory from './pages/ListCategory';
import ListProduct from './pages/ListProduct';
import AddProduct from './pages/AddProduct';
import AddColor from './pages/AddColor';
import AddBrand from './pages/AddBrand';
import AddCat from './pages/AddCat';
import ListBrand from './pages/ListBrand';
import ListColor from './pages/ListColor';
import ListCoupon from './pages/ListCoupon';
import AddCoupon from './pages/AddCoupon';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/admin" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="orders" element={<Order />} />
                    <Route path="customers" element={<Customer />} />
                    <Route path="listcategory" element={<ListCategory />} />
                    <Route path="listproduct" element={<ListProduct />} />
                    <Route path="listbrand" element={<ListBrand />} />
                    <Route path="listcolor" element={<ListColor />} />
                    <Route path="listcoupon" element={<ListCoupon />} />
                    <Route path="coupon" element={<AddCoupon />} />
                    <Route path="coupon/:id" element={<AddCoupon />} />
                    <Route path="product" element={<AddProduct />} />
                    <Route path="color" element={<AddColor />} />
                    <Route path="color/:id" element={<AddColor />} />
                    <Route path="brand" element={<AddBrand />} />
                    <Route path="brand/:id" element={<AddBrand />} />
                    <Route path="category" element={<AddCat />} />
                    <Route path="category/:id" element={<AddCat />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
