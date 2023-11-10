import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Page
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
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

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/admin" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="orders" element={<Order />} />
                    <Route path="customers" element={<Customer />} />
                    <Route path="listcategory" element={<ListCategory />} />
                    <Route path="listproduct" element={<ListProduct />} />
                    <Route path="addproduct" element={<AddProduct />} />
                    <Route path="addcolor" element={<AddColor />} />
                    <Route path="addbrand" element={<AddBrand />} />
                    <Route path="addcategory" element={<AddCat />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
