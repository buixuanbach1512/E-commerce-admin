import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

const login = async (userData) => {
    const response = await axios.post(`${base_url}user/login-admin`, userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const getAllOrders = async () => {
    const response = await axios.get(`${base_url}user/cart/all-order`, config);
    return response.data;
};

const authService = {
    login,
    getAllOrders,
};
export default authService;
