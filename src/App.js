import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Page
import Login from './pages/Login';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import Order from './pages/Order';
import Customer from './pages/Customer';
import ListCategory from './pages/ListCategory';
import ListProduct from './pages/ListProduct';
import ListBrand from './pages/ListBrand';
import ListColor from './pages/ListColor';
import ListCoupon from './pages/ListCoupon';
import AddCoupon from './pages/AddCoupon';
import ViewOrder from './pages/ViewOrder';
import ListSize from './pages/ListSize';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/admin" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="orders" element={<Order />} />
                    <Route path="order/:id" element={<ViewOrder />} />
                    <Route path="customers" element={<Customer />} />
                    <Route path="categories" element={<ListCategory />} />
                    <Route path="products" element={<ListProduct />} />
                    <Route path="brands" element={<ListBrand />} />
                    <Route path="colors" element={<ListColor />} />
                    <Route path="sizes" element={<ListSize />} />
                    <Route path="listcoupon" element={<ListCoupon />} />
                    <Route path="coupon" element={<AddCoupon />} />
                    <Route path="coupon/:id" element={<AddCoupon />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
